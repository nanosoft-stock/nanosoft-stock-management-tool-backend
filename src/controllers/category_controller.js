import { executeQuery } from "../config/db.js";
import * as categoryService from "../services/category_services.js";

export const getAllCategories = async (req, res) => {
  try {
    const { query, values } = categoryService.getAllCategories();
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const { query, values } = categoryService.getCategory(category);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewCategory = async (req, res) => {
  try {
    const { data: category } = req.body;

    const { query, values } = categoryService.addNewCategory(category);
    const result = await executeQuery(query, values);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const oldCategory = req.params.category;
    const { data: newCategory } = req.body;

    const { query, values } = categoryService.updateCategory(
      oldCategory,
      newCategory
    );
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const { query, values } = categoryService.deleteCategory(category);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
