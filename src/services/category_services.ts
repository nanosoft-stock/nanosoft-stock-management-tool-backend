import { QueryResult } from "pg";
import { pool } from "../config/db.js";

export const getAllCategories = async (): Promise<any[]> => {
  const query = `SELECT * FROM categories_view ORDER BY category`;
  const values = [];

  const result: QueryResult = await pool.query(query, values);

  return result.rows;
};

export const getCategory = async (category: string): Promise<any[]> => {
  const query = `SELECT * FROM categories_view WHERE category = $1`;
  const values = [category];

  const result: QueryResult = await pool.query(query, values);

  return result.rows;
};

export const addNewCategory = async (category): Promise<void> => {
  const query = `INSERT INTO categories (category, created_by) 
                 VALUES ($1, $2)`;
  const values = [category.category, category.user_id];

  await pool.query(query, values);
};

export const updateCategory = async (category): Promise<void> => {
  const query = `UPDATE categories SET category = $1 WHERE id = $2`;
  const values = [category.category, category.id];

  await pool.query(query, values);
};

export const deleteCategory = async (category): Promise<void> => {
  const query = `DELETE FROM categories WHERE id = $1`;
  const values = [category.id];

  await pool.query(query, values);
};
