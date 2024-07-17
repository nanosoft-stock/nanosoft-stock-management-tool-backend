import { executeQuery } from "../config/db.js";
import * as warehouseLocationService from "../services/warehouse_location_services.js";

export const getAllWarehouseLocations = async (req, res) => {
  try {
    const { query, values } =
      warehouseLocationService.getAllWarehouseLocations();
    const warehouseLocations = await executeQuery(query, values);

    res.status(200).json(warehouseLocations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewWarehouseLocation = async (req, res) => {
  try {
    const warehouseLocationId = req.body.warehouse_location_id;

    const { query, values } =
      warehouseLocationService.addNewWarehouseLocation(warehouseLocationId);
    const warehouseLocation = await executeQuery(query, values);

    res.status(201).json(warehouseLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewWarehouseLocations = async (req, res) => {
  try {
    const body = req.body;

    const { query, values } =
      warehouseLocationService.addNewWarehouseLocations(body);
    const warehouseLocations = await executeQuery(query, values);

    res.status(200).json(warehouseLocations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
