import { executeQuery } from "../config/db.js";
import * as categoryService from "../services/category_services.js";

export const getAllCategories = async (req, res) => {
  try {
    const { query, values } = categoryService.getAllCategories();
    const categories = await executeQuery(query, values);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const { query, values } = categoryService.getCategory(category);
    const categories = await executeQuery(query, values);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewCategory = async (req, res) => {
  try {
    const { category } = req.body;

    const { query, values } = categoryService.addNewCategory(category);
    const categories = await executeQuery(query, values);

    res.status(201).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const categoryUUID = req.params.categoryUUID;
    const { category } = req.body;

    const { query, values } = categoryService.updateCategory(
      categoryUUID,
      category
    );
    const categories = await executeQuery(query, values);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryUUID = req.params.categoryUUID;

    const { query, values } = categoryService.deleteCategory(categoryUUID);
    const categories = await executeQuery(query, values);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};