import { Request, Response } from "express";
import { pool } from "../config/db.js";
import * as fieldsService from "../services/fields_services.js";

export const getAllFields = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await pool.query("BEGIN");
    const result: any[] = await fieldsService.getAllFields();
    await pool.query("COMMIT");

    res.status(200).json({ data: result });
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const getCategoryFields = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const category = req.params.category;

    await pool.query("BEGIN");
    const result: any[] = await fieldsService.getCategoryFields(category);
    await pool.query("COMMIT");

    res.status(200).json({ data: result });
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addField = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: field } = req.body;

    await pool.query("BEGIN");
    await fieldsService.addField(field);
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addFields = async (req: Request, res: Response): Promise<void> => {
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

export const updateField = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: field } = req.body;

    await pool.query("BEGIN");
    await fieldsService.updateField(field);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateFields = async (
  req: Request,
  res: Response,
): Promise<void> => {
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

export const deleteField = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: field } = req.body;

    await pool.query("BEGIN");
    await fieldsService.deleteField(field);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteFields = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
