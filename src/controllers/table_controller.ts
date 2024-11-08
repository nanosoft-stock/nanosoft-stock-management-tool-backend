import { Request, Response } from "express";
import { pool } from "../config/db.js";
import * as tableService from "../services/table_services.js";

export const createNewTable = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: table } = req.body;

    await pool.query("BEGIN");
    await tableService.createNewTable(table);
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addNewTableFields = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data } = req.body;
    const { category, fields } = data;

    await pool.query("BEGIN");
    for (let i = 0; i < fields.length; i++) {
      await tableService.addNewTableFields(category, fields[i]);
    }
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateTableFields = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data } = req.body;
    const { category, fields } = data;

    await pool.query("BEGIN");
    for (let i = 0; i < fields.length; i++) {
      await tableService.updateTableFields(category, fields[i]);
    }
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteTableFields = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data } = req.body;
    const { category, fields } = data;

    await pool.query("BEGIN");
    for (let i = 0; i < fields.length; i++) {
      await tableService.deleteTableFields(category, fields[i]);
    }
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};
