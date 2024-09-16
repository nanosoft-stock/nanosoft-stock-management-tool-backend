import { pool } from "../config/db.js";

export const getAllItems = async () => {
  const query = "SELECT * FROM items_view ORDER BY item_id";
  const values = [];

  const result = await pool.query(query, values);

  return result;
};

export const getItem = async (itemId) => {
  const query = "SELECT * FROM items_view WHERE item_id = $1";
  const values = [itemId];

  const result = await pool.query(query, values);

  return result;
};

export const addItem = async (item) => {
  const keys = Object.keys(item);

  let query = "INSERT INTO items ";
  const values = [];

  query += "(" + keys.join(", ") + ")";
  query += " VALUES ";

  let index = 1;
  query += "(" + keys.map((_) => `$${index++}`).join(", ") + ")";
  values.push(...Object.values(item));

  await pool.query(query, values);
};

export const addItems = async (items) => {
  const keys = Object.keys(items[0]);

  let query = "INSERT INTO items ";
  const values = [];

  query += "(" + keys.join(", ") + ")";
  query += " VALUES ";

  let index = 1;
  const insertStatements = [];

  for (let item of items) {
    insertStatements.push(
      "(" + keys.map((_) => `$${index++}`).join(", ") + ")"
    );
    values.push(...Object.values(item));
  }

  query += insertStatements.join(", ");

  await pool.query(query, values);
};

export const updateItem = async (id, item) => {
  let keys = Object.keys(item);

  let query = "UPDATE items SET ";
  const values = [];

  let index = 1;
  query += keys.map((key) => `${key} = $${index++}`).join(", ");
  values.push(...Object.values(item));

  query += ` WHERE id = $${index}`;
  values.push(id);

  await pool.query(query, values);
};

export const deleteItem = async (item) => {
  const query = "DELETE FROM items WHERE id = $1";
  const values = [item.id];

  await pool.query(query, values);
};

export const deleteItems = async (items) => {
  let query = "DELETE FROM items WHERE id IN ";
  const values = [];
  let index = 1;

  query += "(" + items.map((_) => `$${index++}`).join(", ") + ")";
  values.push(...items.map((item) => item.id));

  await pool.query(query, values);
};

export const generateNewItems = async (count) => {
  let query = "SELECT fn_generate_item_ids($1)";
  const values = [count];

  const result = await pool.query(query, values);

  return result.rows;
};

export const deleteGeneratedItems = async (start, end) => {
  let query = "SELECT fn_delete_item_ids($1, $2)";
  const values = [start, end];

  const result = await pool.query(query, values);

  return result.rows;
};
