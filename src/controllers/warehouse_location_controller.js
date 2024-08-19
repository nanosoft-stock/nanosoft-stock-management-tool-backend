import { executeQuery } from "../config/db.js";
import * as warehouseLocationService from "../services/warehouse_location_services.js";

export const getWarehouseLocation = async (req, res) => {
  try {
    const warehouseLocationId = req.params.warehouseLocationId;

    const { query, values } =
      warehouseLocationService.getWarehouseLocation(warehouseLocationId);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllWarehouseLocations = async (req, res) => {
  try {
    const { query, values } =
      warehouseLocationService.getAllWarehouseLocations();
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addWarehouseLocation = async (req, res) => {
  try {
    const { data: warehouseLocations } = req.body;

    const { query, values } =
      warehouseLocationService.addWarehouseLocation(warehouseLocations);
    const result = await executeQuery(query, values);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addWarehouseLocations = async (req, res) => {
  try {
    const { data: warehouseLocations } = req.body;

    const { query, values } =
      warehouseLocationService.addWarehouseLocations(warehouseLocations);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWarehouseLocation = async (req, res) => {
  try {
    const { data: warehouseLocation } = req.body;

    const { query, values } =
      warehouseLocationService.updateWarehouseLocation(warehouseLocation);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWarehouseLocations = async (req, res) => {
  try {
    const { data: warehouseLocations } = req.body;
    const result = [];

    for (let warehouseLocation of warehouseLocations) {
      const { query, values } =
        warehouseLocationService.updateWarehouseLocation(warehouseLocation);
      result.push(...(await executeQuery(query, values)));
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWarehouseLocation = async (req, res) => {
  try {
    const { data: warehouseLocation } = req.body;

    const { query, values } =
      warehouseLocationService.deleteWarehouseLocation(warehouseLocation);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWarehouseLocations = async (req, res) => {
  try {
    const { data: warehouseLocations } = req.body;

    const { query, values } =
      warehouseLocationService.deleteWarehouseLocations(warehouseLocations);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
