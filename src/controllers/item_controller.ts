import { Request, Response } from "express";
import { pool } from "../config/db.js";
import * as itemService from "../services/item_services.js";

export const getAllItems = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await pool.query("BEGIN");
    const result: any[] = await itemService.getAllItems();
    await pool.query("COMMIT");

    res.status(200).json({ data: result });
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const getItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const itemId = req.params.itemId;

    await pool.query("BEGIN");
    const result: any[] = await itemService.getItem(itemId);
    await pool.query("COMMIT");

    res.status(200).json({ data: result });
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: item } = req.body;

    await pool.query("BEGIN");
    await itemService.addItem(item);
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: items } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < items.length; i++) {
      await itemService.addItem(items[i]);
    }
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: item } = req.body;

    await pool.query("BEGIN");
    await itemService.updateItem(item);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateItems = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: items } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < items.length; i++) {
      await itemService.updateItem(items[i]);
    }
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: item } = req.body;

    await pool.query("BEGIN");
    await itemService.deleteItem(item);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteItems = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: items } = req.body;

    await pool.query("BEGIN");
    await itemService.deleteItems(items);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const generateNewItems = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { count, email } = req.body.data;

    await pool.query("BEGIN");
    const result: any[] = await itemService.generateNewItems(count, email);
    await pool.query("COMMIT");

    res.status(201).json(result);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteGeneratedItems = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { start, end } = req.body.data;

    await pool.query("BEGIN");
    await itemService.deleteGeneratedItems(start, end);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};