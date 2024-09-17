import { pool } from "../config/db.js";

export const getAllItems = async () => {
  const query = `SELECT * FROM items_view ORDER BY item_id`;
  const values = [];

  const result = await pool.query(query, values);

  return result.rows;
};

export const getItem = async (itemId) => {
  const query = `SELECT * FROM items_view WHERE item_id = $1`;
  const values = [itemId];

  const result = await pool.query(query, values);

  return result.rows;
};

export const addItem = async (item) => {
  const query = `INSERT INTO items (item_id, status, created_by) 
                 SELECT $1, $2, users_view.id FROM users_view WHERE email = $3`;
  const values = [item.item_id, item.status, item.email];

  await pool.query(query, values);
};

export const updateItem = async (item) => {
  const query = `UPDATE items SET 
                 item_id = COALESCE($1, item_id), 
                 status = COALESCE($2, status) 
                 WHERE id = $3`;
  const values = [item.item_id, item.status, item.id];

  await pool.query(query, values);
};

export const deleteItem = async (item) => {
  const query = `DELETE FROM items WHERE id = $1`;
  const values = [item.id];

  await pool.query(query, values);
};

export const deleteItems = async (items) => {
  const query = `DELETE FROM items WHERE id = ANY($1::INT[])`;
  const values = [items.map((item) => item.id)];

  await pool.query(query, values);
};

export const generateNewItems = async (count, email) => {
  const query = `SELECT * FROM fn_generate_item_ids($1, $2)`;
  const values = [count, email];

  const result = await pool.query(query, values);

  return result.rows;
};

export const deleteGeneratedItems = async (start, end) => {
  const query = `SELECT * FROM fn_delete_item_ids($1, $2)`;
  const values = [start, end];

  const result = await pool.query(query, values);

  return result.rows;
};
