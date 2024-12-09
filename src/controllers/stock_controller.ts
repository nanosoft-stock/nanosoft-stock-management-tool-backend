import { Request, Response } from "express";
import { pool } from "../config/db.js";
import * as stockService from "../services/stock_services.js";
import { printDebugError } from "../helpers/print_error.js";

export const getAllStocks = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await pool.query("BEGIN");
    const result: any[] = await stockService.getAllStocks();
    await pool.query("COMMIT");

    res.status(200).json({ data: result });
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const addStock = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: stock } = req.body;

    await pool.query("BEGIN");
    await stockService.addStock(stock);
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const addStocks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data: stocks } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < stocks.length; i++) {
      await stockService.addStock(stocks[i]);
    }
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const updateStock = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: stock } = req.body;

    await pool.query("BEGIN");
    await stockService.updateStock(stock);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const updateStocks = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: stocks } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < stocks.length; i++) {
      await stockService.updateStock(stocks[i]);
    }
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const deleteStock = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: stock } = req.body;

    await pool.query("BEGIN");
    await stockService.deleteStock(stock);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const deleteStocks = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: stocks } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < stocks.length; i++) {
      await stockService.deleteStock(stocks[i]);
    }
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const queryStocks = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: q } = req.body;

    await pool.query("BEGIN");
    const result: any[] = await stockService.queryStocks(q);
    await pool.query("COMMIT");

    res.status(200).json({ data: result });
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};
