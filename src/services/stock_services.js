import { pool } from "../config/db.js";
import { queryBuilderHelper } from "../helpers/query_builder_helper.js";
import { postProcessStocks } from "../helpers/stock_helper.js";

const commonColumns = [
  "date",
  "item_id",
  "category",
  "sku",
  "serial_number",
  "container_id",
  "warehouse_location_id",
  "supplier_info",
  "comments",
  "email",
];

export const getAllStocks = async () => {
  const query = `SELECT * FROM stocks_view ORDER BY date DESC, item_id DESC LIMIT 100`;
  const values = [];

  const result = await pool.query(query, values);

  return result.rows;
};

export const getStock = async (itemId) => {
  const query = `SELECT * FROM stocks_view WHERE item_id = $1`;
  const values = [itemId];

  const result = await pool.query(query, values);

  return result.rows;
};

export const addStock = async (stock) => {
  const stockQuery = `INSERT INTO stocks 
                      (date, item_fid, category_fid, sku_fid, serial_number, container_fid, warehouse_location_fid, supplier_info, comments, user_fid) 
                      SELECT $1, items.id, categories.id, skus.id, $2, containers.id, warehouse_locations.id, $3, $4, users.id 
                      FROM users
                      LEFT JOIN items ON items.item_id = $5  
                      LEFT JOIN categories ON categories.category = $6 
                      LEFT JOIN skus ON skus.sku = $7 
                      LEFT JOIN containers ON containers.container_id = $8 
                      LEFT JOIN warehouse_locations ON warehouse_locations.warehouse_location_id = $9 
                      WHERE users.email = $10`;
  const stockValues = [
    stock.date,
    stock.serial_number,
    stock.supplier_info,
    stock.comments,
    stock.item_id,
    stock.category,
    stock.sku,
    stock.container_id,
    stock.warehouse_location_id,
    stock.email,
  ];

  const keys = Object.keys(stock);
  const categoryBasedColumns = {};

  for (let key of keys) {
    if (!commonColumns.includes(key)) {
      categoryBasedColumns[key] = stock[key];
    }
  }

  const categoryKeys = Object.keys(categoryBasedColumns);

  let index = 1;
  const categoryKey = stock.category.replace(` `, `_`).toLowerCase();
  const categoryBasedQuery = `INSERT INTO ${categoryKey}_specifications 
        (item_fid, ${categoryKeys.join(", ")}) 
        SELECT items.id, ${categoryKeys.map((_) => `$${index++}`).join(", ")} 
        FROM items WHERE items.item_id = $${index++}`;
  const categoryBasedValues = [
    ...Object.values(categoryBasedColumns),
    stock.item_id,
  ];

  await pool.query(stockQuery, stockValues);
  await pool.query(categoryBasedQuery, categoryBasedValues);
};

export const updateStock = async (stock) => {
  const stockQuery = `UPDATE stocks SET
   item_fid = COALESCE((SELECT id FROM items WHERE item_id = $1), item_fid), 
   category_fid = COALESCE((SELECT id FROM categories WHERE category_id = $2), category_fid), 
   skus_fid = COALESCE((SELECT id FROM skus WHERE sku_id = $3), sku_fid), 
   serial_number = COALESCE($4, serial_number), 
   container_fid = COALESCE((SELECT id FROM containers WHERE container_id = $5), container_fid), 
   warehouse_location_fid = COALESCE((SELECT id FROM warehouse_locations WHERE warehouse_location_id = $6), warehouse_location_fid), 
   supplier_info = COALESCE($7, supplier_info), 
   comments = COALESCE($8, supplier_info), 
   WHERE id = $9
   `;
  const stockValues = [
    stock.item_id,
    stock.category,
    stock.sku,
    stock.serial_number,
    stock.container_id,
    stock.warehouse_location_id,
    stock.supplier_info,
    stock.comments,
    stock.id,
  ];

  const keys = Object.keys(stock);
  const categoryBasedColumns = {};

  for (let key of keys) {
    if (!commonColumns.includes(key)) {
      categoryBasedColumns[key] = stock[key];
    }
  }

  const categoryKeys = Object.keys(categoryBasedColumns);

  let index = 1;
  const categoryKey = stock.category.replace(" ", "_").toLowerCase();
  const categoryBasedQuery = `UPDATE ${categoryKey}_specifications 
   ${categoryKeys.map((key) => `${key} = COALESCE(${index++}, ${key})`).join(", ")}
   WHERE item_fid = (SELECT id FROM items WHERE item_id = ${index++})
   `;
  const categoryBasedValues = [
    ...categoryKeys.map((key) => stock[key]),
    stock.item_id,
  ];

  await pool.query(stockQuery, stockValues);
  await pool.query(categoryBasedQuery, categoryBasedValues);
};

export const deleteStock = async (stock) => {
  const stocksQuery = `DELETE FROM stocks 
                       USING items 
                       WHERE items.id = stocks.item_fid AND items.item_id = $1`;
  const stocksValues = [stock.item_id];

  const categoryKey = stock.category.replace(" ", "_").toLowerCase();
  const categoryBasedQuery = `DELETE FROM ${categoryKey}_specifications AS spec
                              USING items 
                              WHERE items.id = spec.item_fid AND items.item_id = $1`;
  const categoryBasedValues = [stock.item_id];

  await pool.query(categoryBasedQuery, categoryBasedValues);
  await pool.query(stocksQuery, stocksValues);
};

export const queryStocks = async (q) => {
  q[`from`] = `stocks`;

  const { query, values } = queryBuilderHelper(q);

  const result = await pool.query(query, values);

  return postProcessStocks(result);
};
