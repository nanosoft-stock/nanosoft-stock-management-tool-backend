import { Request, Response } from "express";
import { pool } from "../config/db.js";
import * as categoryService from "../services/category_services.js";
import { printDebugError } from "../helpers/print_error.js";

export const getAllCategories = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await pool.query("BEGIN");
    const result: any[] = await categoryService.getAllCategories();
    await pool.query("COMMIT");

    res.status(200).json({ data: result });
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const addNewCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: category } = req.body;

    await pool.query("BEGIN");
    await categoryService.addNewCategory(category);
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: category } = req.body;

    await pool.query("BEGIN");
    await categoryService.updateCategory(category);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: category } = req.body;

    await pool.query("BEGIN");
    await categoryService.deleteCategory(category);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};
