import { executeQuery } from "../config/db.js";

export const getAllCategories = async () => {
  const query = "SELECT * FROM categories ORDER BY category";
  const values = [];

  const result = await executeQuery(query, values);

  return result;
};

export const getCategory = async (category) => {
  const query = "SELECT * FROM categories WHERE category = $1";
  const values = [category];

  const result = await executeQuery(query, values);

  return result;
};

export const addNewCategory = async (category) => {
  const query = "INSERT INTO categories (category) VALUES ($1)";
  const values = [category];

  await executeQuery(query, values);
};

export const updateCategory = async (oldCategory, newCategory) => {
  const query = "UPDATE categories SET category = $1 WHERE category = $2";
  const values = [newCategory, oldCategory];

  await executeQuery(query, values);
};

export const deleteCategory = async (category) => {
  const query = "DELETE FROM categories WHERE category = $1";
  const values = [category];

  await executeQuery(query, values);
};
