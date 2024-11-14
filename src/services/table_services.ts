import { QueryResult } from "pg";
import { pool } from "../config/db.js";
import { toLowerSnakeCase } from "../helpers/string_helper.js";

const commonColumns = [
  "date",
  "item id",
  "category",
  "sku",
  "serial number",
  "container id",
  "warehouse location id",
  "supplier info",
  "comments",
  "username",
  "is dispatched",
];

export const createNewTable = async (table): Promise<void> => {
  // Fetch the category fields
  let count = 1;
  const fieldQuery = `SELECT * FROM fields_view WHERE category = $${count++} and field NOT IN (${commonColumns
    .map(() => `$${count++}`)
    .join(`, `)}) ORDER BY display_order`;
  const fieldValues = [table.category, ...commonColumns];

  const fieldResult: QueryResult = await pool.query(fieldQuery, fieldValues);
  const categoryFields = fieldResult.rows;

  // Create a new category _specifications table
  const newTableQuery = `CREATE TABLE IF NOT EXISTS ${toLowerSnakeCase(table.category)}_specifications (
                         id SERIAL, 
                         item_fid INT NOT NULL, 
                         ${categoryFields.map((e) => `${toLowerSnakeCase(e.field)} VARCHAR(255)`).join(", \n")}, 

                         PRIMARY KEY(id), 
                         UNIQUE(item_fid), 
                         FOREIGN KEY (item_fid) REFERENCES items(id) 
                         )`;
  const newTableValues = [];

  await pool.query(newTableQuery, newTableValues);

  // Fetch all categories
  const categoryQuery = `SELECT * FROM categories_view ORDER BY id`;
  const categoryValues = [];

  const categoryResult: QueryResult = await pool.query(
    categoryQuery,
    categoryValues,
  );
  const categories = categoryResult.rows;

  // Update stocks_view with the new category table
  const stocksViewQuery = `CREATE OR REPLACE VIEW stocks_view 
                           AS 
                               SELECT 
                                   stocks.id AS id, 
                                   date, 
                                   items.item_id AS item_id, 
                                   categories.category AS category, 
                                   skus.sku AS sku, 
                                   serial_number, 
                                   containers.container_id AS container_id, 
                                   warehouse_locations.warehouse_location_id AS warehouse_location_id, 
                                   CASE 
                                       ${categories.map((e) => `WHEN (stocks.category_fid = ${e.id}) THEN row_to_json(${toLowerSnakeCase(e.category)}_specifications)`).join(" \n")}
                                       ELSE NULL 
                                   END AS specifications, 
                                   supplier_info, 
                                   comments, 
                                   users.username AS username 
                               FROM stocks 
                                   LEFT JOIN items ON items.id = stocks.item_fid 
                                   LEFT JOIN categories ON categories.id = stocks.category_fid 
                                   LEFT JOIN skus ON skus.id = stocks.sku_fid 
                                   LEFT JOIN containers ON containers.id = stocks.container_fid 
                                   LEFT JOIN warehouse_locations ON warehouse_locations.id = stocks.warehouse_location_fid 
                                   ${categories.map((e) => `LEFT JOIN ${toLowerSnakeCase(e.category)}_specifications ON ${toLowerSnakeCase(e.category)}_specifications.item_fid = stocks.item_fid`).join(" \n")}
                                   LEFT JOIN users ON users.id = stocks.user_fid`;
  const stocksViewValues = [];

  await pool.query(stocksViewQuery, stocksViewValues);

  // Create Notification Functions and Triggers
  const notificationQuery = `CREATE OR REPLACE FUNCTION fn_${toLowerSnakeCase(table.category)}_specifications_notify_event() RETURNS trigger AS $$
                             DECLARE
                                 view_data JSON;
                                 payload JSON;
                             BEGIN
                                 IF TG_OP = 'DELETE' THEN
                                     SELECT row_to_json(stocks_view) INTO view_data FROM stocks_view WHERE specifications ->> 'id' = OLD.id;
                                 ELSE
                                     SELECT row_to_json(stocks_view) INTO view_data FROM stocks_view WHERE specifications ->> 'id' = NEW.id;
                                 END IF;

                                 IF view_data IS NOT NULL THEN
                                     payload = json_build_object(
                                         'table', 'stocks',
                                         'operation', TG_OP,
                                         'data', view_data
                                     );

                                     PERFORM pg_notify('table_update', payload::TEXT);
                                 END IF;

                                 IF TG_OP = 'DELETE' THEN
                                     RETURN OLD;
                                 ELSE 
                                     RETURN NEW;
                                 END IF;
                             END
                             $$ LANGUAGE plpgsql;


                         CREATE OR REPLACE TRIGGER tg_${toLowerSnakeCase(table.category)}_specifications_insert_or_update
                             AFTER INSERT OR UPDATE 
                             ON ${toLowerSnakeCase(table.category)}_specifications
                             FOR EACH ROW
                                 EXECUTE PROCEDURE fn_${toLowerSnakeCase(table.category)}_specifications_notify_event();


                         CREATE OR REPLACE TRIGGER tg_${toLowerSnakeCase(table.category)}_specifications_delete
                             BEFORE DELETE
                             ON ${toLowerSnakeCase(table.category)}_specifications
                             FOR EACH ROW
                                  EXECUTE PROCEDURE fn_${toLowerSnakeCase(table.category)}_specifications_notify_event();`;
  const notificationValues = [];

  await pool.query(notificationQuery, notificationValues);
};

export const addNewTableFields = async (category, field): Promise<void> => {
  let datatype;
  if (field.datatype == "string") {
    datatype = "VARCHAR(255)";
  } else if (field.datatype == "timestamp") {
    datatype = "TIMESTAMPTZ";
  } else if (field.datatype == "double") {
    datatype = "VARCHAR(255)";
  }

  const query = `ALTER TABLE ${toLowerSnakeCase(category)}_specifications ADD COLUMN ${toLowerSnakeCase(field.new_field)} ${datatype}`;
  const values = [];

  await pool.query(query, values);
};

export const updateTableFields = async (category, field): Promise<void> => {
  const query = `ALTER TABLE ${toLowerSnakeCase(category)}_specifications RENAME COLUMN ${toLowerSnakeCase(field.old_field)} TO ${toLowerSnakeCase(field.new_field)}`;
  const values = [];

  await pool.query(query, values);
};

export const deleteTableFields = async (category, field): Promise<void> => {
  const query = `ALTER TABLE ${toLowerSnakeCase(category)}_specifications DROP COLUMN ${toLowerSnakeCase(field.old_field)}`;
  const values = [];

  await pool.query(query, values);
};
