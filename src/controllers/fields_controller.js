import * as fieldsService from "../services/fields_services.js";

export const getAllFields = async (req, res) => {
  try {
    const result = await fieldsService.getAllFields();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryFields = async (req, res) => {
  try {
    const category = req.params.category;

    const result = await fieldsService.getCategoryFields(category);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFields = async (req, res) => {
  try {
    const { data: fields } = req.body;

    await fieldsService.addFields(fields);

    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFields = async (req, res) => {
  try {
    const { data: fields } = req.body;
    const result = [];

    await Promise.all(fields.map((field) => fieldsService.updateField(field)));

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFields = async (req, res) => {
  try {
    const { data: fields } = req.body;

    await fieldsService.deleteFields(fields);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
