import * as categoryService from "../services/category_services.js";

export const getAllCategories = async (req, res) => {
  try {
    const result = await categoryService.getAllCategories();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const result = await categoryService.getCategory(category);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewCategory = async (req, res) => {
  try {
    const { data: category } = req.body;

    await categoryService.addNewCategory(category);

    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const oldCategory = req.params.category;
    const { data: newCategory } = req.body;

    await categoryService.updateCategory(oldCategory, newCategory);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = req.params.category;

    await categoryService.deleteCategory(category);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
