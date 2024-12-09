import { QueryResult } from "pg";
import { pool } from "../config/db.js";
import { queryBuilderHelper } from "../helpers/query_builder_helper.js";

export const getAllItems = async (): Promise<any[]> => {
  const query = `SELECT * FROM items_view ORDER BY item_id`;
  const values = [];

  const result: QueryResult = await pool.query(query, values);

  return result.rows;
};

export const addItem = async (item): Promise<void> => {
  const query = `INSERT INTO items (item_id, status, created_by) 
                 VALUES ($1, $2, $3)`;
  const values = [item.item_id, item.status, item.id];

  await pool.query(query, values);
};

export const updateItem = async (item): Promise<void> => {
  const query = `UPDATE items SET 
                 status = COALESCE($1, status) 
                 WHERE item_id = $2`;
  const values = [item.status, item.item_id];

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

export const queryItems = async (q): Promise<any[]> => {
  q["from"] = "items_view";

  const { query, values } = queryBuilderHelper(q);
  const result: QueryResult = await pool.query(query, values);

  return result.rows;
};

export const generateNewItems = async (
  count: number,
  userId: number,
): Promise<any[]> => {
  const query = `SELECT * FROM fn_generate_item_ids($1, $2)`;
  const values = [count, userId];

  const result = await pool.query(query, values);

  return result.rows;
};

export const deleteGeneratedItems = async (
  start: string,
  end: string,
): Promise<void> => {
  const query = `SELECT * FROM fn_delete_item_ids($1, $2)`;
  const values = [start, end];

  await pool.query(query, values);
};
