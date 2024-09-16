import { pool } from "../config/db.js";
import * as categoryService from "../services/category_services.js";

export const getAllCategories = async (req, res) => {
  try {
    await pool.query("BEGIN");
    const result = await categoryService.getAllCategories();
    await pool.query("COMMIT");

    res.status(200).json(result);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = req.params.category;

    await pool.query("BEGIN");
    const result = await categoryService.getCategory(category);
    await pool.query("COMMIT");

    res.status(200).json(result);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addNewCategory = async (req, res) => {
  try {
    const { data: category } = req.body;

    await pool.query("BEGIN");
    await categoryService.addNewCategory(category);
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { data } = req.body;
    const { id, ...category } = data;

    await pool.query("BEGIN");
    await categoryService.updateCategory(id, category);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { data } = req.body;
    const { id } = data;

    await pool.query("BEGIN");
    await categoryService.deleteCategory(id);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};
