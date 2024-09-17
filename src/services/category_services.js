import { pool } from "../config/db.js";

export const getAllCategories = async () => {
  const query = `SELECT * FROM categories_view ORDER BY category`;
  const values = [];

  const result = await pool.query(query, values);

  return result.rows;
};

export const getCategory = async (category) => {
  const query = `SELECT * FROM categories_view WHERE category = $1`;
  const values = [category];

  const result = await pool.query(query, values);

  return result.rows;
};

export const addNewCategory = async (category) => {
  const query = `INSERT INTO categories (category, created_by) 
                 SELECT $1, users_view.id FROM users_view 
                 WHERE email = $2`;
  const values = [category.category, category.email];

  await pool.query(query, values);
};

export const updateCategory = async (category) => {
  const query = `UPDATE categories SET category = $1 WHERE id = $2`;
  const values = [category.category, category.id];

  await pool.query(query, values);
};

export const deleteCategory = async (category) => {
  const query = `DELETE FROM categories WHERE id = $1`;
  const values = [category.id];

  await pool.query(query, values);
};
