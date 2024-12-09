import { Request, Response } from "express";
import { pool } from "../config/db.js";
import * as warehouseLocationService from "../services/warehouse_location_services.js";
import { printDebugError } from "../helpers/print_error.js";

export const getAllWarehouseLocations = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await pool.query("BEGIN");
    const result: any[] =
      await warehouseLocationService.getAllWarehouseLocations();
    await pool.query("COMMIT");

    res.status(200).json({ data: result });
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const addWarehouseLocation = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: warehouseLocation } = req.body;

    await pool.query("BEGIN");
    await warehouseLocationService.addWarehouseLocation(warehouseLocation);
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const addWarehouseLocations = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: warehouseLocations } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < warehouseLocations.length; i++) {
      await warehouseLocationService.addWarehouseLocation(
        warehouseLocations[i],
      );
    }
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const updateWarehouseLocation = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: warehouseLocation } = req.body;

    await pool.query("BEGIN");
    await warehouseLocationService.updateWarehouseLocation(warehouseLocation);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const updateWarehouseLocations = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: warehouseLocations } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < warehouseLocations.length; i++) {
      await warehouseLocationService.updateWarehouseLocation(
        warehouseLocations[i],
      );
    }
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const deleteWarehouseLocation = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: warehouseLocation } = req.body;

    await pool.query("BEGIN");
    await warehouseLocationService.deleteWarehouseLocation(warehouseLocation);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const deleteWarehouseLocations = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: warehouseLocations } = req.body;

    await pool.query("BEGIN");
    await warehouseLocationService.deleteWarehouseLocations(warehouseLocations);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const queryWarehouseLocations = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: q } = req.body;

    await pool.query("BEGIN");
    const result: any[] =
      await warehouseLocationService.queryWarehouseLocations(q);
    await pool.query("COMMIT");

    res.status(200).json({ data: result });
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};
