import { executeQuery } from "../config/db.js";
import * as fieldsService from "../services/fields_services.js";

export const getAllFields = async (req, res) => {
  try {
    const { query, values } = fieldsService.getAllFields();
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryFields = async (req, res) => {
  try {
    const categoryUUID = req.params.categoryUUID;

    const { query, values } = fieldsService.getCategoryFields(categoryUUID);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFields = async (req, res) => {
  try {
    const { fields } = req.body;

    const { query, values } = fieldsService.addFields(fields);
    const result = await executeQuery(query, values);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFields = async (req, res) => {
  try {
    const { fields } = req.body;
    const result = [];

    for (let field of fields) {
      const { field_uuid: fieldUUID, ...data } = field;
      const { query, values } = fieldsService.updateField(fieldUUID, data);
      result.push(await executeQuery(query, values));
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFields = async (req, res) => {
  try {
    const { fields } = req.body;

    const { query, values } = fieldsService.deleteFields(fields);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
