import { pool } from "../config/db.js";
import * as warehouseLocationService from "../services/warehouse_location_services.js";

export const getAllWarehouseLocations = async (req, res) => {
  try {
    await pool.query("BEGIN");
    const result = await warehouseLocationService.getAllWarehouseLocations();
    await pool.query("COMMIT");

    res.status(200).json(result);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const getWarehouseLocation = async (req, res) => {
  try {
    const warehouseLocationId = req.params.warehouseLocationId;

    await pool.query("BEGIN");
    const result = await warehouseLocationService.getWarehouseLocation(
      warehouseLocationId
    );
    await pool.query("COMMIT");

    res.status(200).json(result);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addWarehouseLocation = async (req, res) => {
  try {
    const { data: warehouseLocation } = req.body;

    await pool.query("BEGIN");
    await warehouseLocationService.addWarehouseLocation(warehouseLocation);
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addWarehouseLocations = async (req, res) => {
  try {
    const { data: warehouseLocations } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < warehouseLocations.length; i++) {
      const warehouseLocation = warehouseLocations[i];
      await warehouseLocationService.addWarehouseLocation(warehouseLocation);
    }
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateWarehouseLocation = async (req, res) => {
  try {
    const { data } = req.body;
    const { id, ...warehouseLocation } = data;

    await pool.query("BEGIN");
    await warehouseLocationService.updateWarehouseLocation(
      id,
      warehouseLocation
    );
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateWarehouseLocations = async (req, res) => {
  try {
    const { data: warehouseLocations } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < warehouseLocations.length; i++) {
      const { id, ...warehouseLocation } = warehouseLocations[i];

      await warehouseLocationService.updateWarehouseLocation(
        id,
        warehouseLocation
      );
    }
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteWarehouseLocation = async (req, res) => {
  try {
    const { data: warehouseLocation } = req.body;

    await pool.query("BEGIN");
    await warehouseLocationService.deleteWarehouseLocation(warehouseLocation);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteWarehouseLocations = async (req, res) => {
  try {
    const { data: warehouseLocations } = req.body;

    await pool.query("BEGIN");
    await warehouseLocationService.deleteWarehouseLocations(warehouseLocations);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};
