import * as fieldsService from "../services/fields_services.js";

export const getAllFields = async (req, res) => {
  try {
    await pool.query("BEGIN");
    const result = await fieldsService.getAllFields();
    await pool.query("COMMIT");

    res.status(200).json(result);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const getCategoryFields = async (req, res) => {
  try {
    const category = req.params.category;

    await pool.query("BEGIN");
    const result = await fieldsService.getCategoryFields(category);
    await pool.query("COMMIT");

    res.status(200).json(result);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addFields = async (req, res) => {
  try {
    const { data: fields } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < fields.length; i++) {
      await fieldsService.addField(fields[i]);
    }
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateFields = async (req, res) => {
  try {
    const { data: fields } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < fields.length; i++) {
      await fieldsService.updateField(fields[i]);
    }
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteFields = async (req, res) => {
  try {
    const { data: fields } = req.body;

    await pool.query("BEGIN");
    await fieldsService.deleteFields(fields);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};
