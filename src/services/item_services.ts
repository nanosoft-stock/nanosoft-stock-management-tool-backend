import { QueryResult } from "pg";
import { pool } from "../config/db.js";

export const getAllItems = async (): Promise<any[]> => {
  const query = `SELECT * FROM items_view ORDER BY item_id`;
  const values = [];

  const result: QueryResult = await pool.query(query, values);

  return result.rows;
};

export const getItem = async (itemId: string): Promise<any[]> => {
  const query = `SELECT * FROM items_view WHERE item_id = $1`;
  const values = [itemId];

  const result: QueryResult = await pool.query(query, values);

  return result.rows;
};

export const addItem = async (item): Promise<void> => {
  const query = `INSERT INTO items (item_id, status, created_by) 
                 SELECT $1, $2, users_view.id FROM users_view WHERE email = $3`;
  const values = [item.item_id, item.status, item.email];

  await pool.query(query, values);
};

export const updateItem = async (item): Promise<void> => {
  const query = `UPDATE items SET 
                 item_id = COALESCE($1, item_id), 
                 status = COALESCE($2, status) 
                 WHERE id = $3`;
  const values = [item.item_id, item.status, item.id];

  await pool.query(query, values);
};

export const deleteItem = async (item): Promise<void> => {
  const query = `DELETE FROM items WHERE id = $1`;
  const values = [item.id];

  await pool.query(query, values);
};

export const deleteItems = async (items): Promise<void> => {
  const query = `DELETE FROM items WHERE id = ANY($1::INT[])`;
  const values = [items.map((item) => item.id)];

  await pool.query(query, values);
};

export const generateNewItems = async (count, email): Promise<any[]> => {
  const query = `SELECT * FROM fn_generate_item_ids($1, $2)`;
  const values = [count, email];

  const result = await pool.query(query, values);

  return result.rows;
};

export const deleteGeneratedItems = async (start, end): Promise<void> => {
  const query = `SELECT * FROM fn_delete_item_ids($1, $2)`;
  const values = [start, end];

  await pool.query(query, values);
};
