import * as warehouseLocationService from "../services/warehouse_location_services.js";

export const getWarehouseLocation = async (req, res) => {
  try {
    const warehouseLocationId = req.params.warehouseLocationId;

    const result = await warehouseLocationService.getWarehouseLocation(
      warehouseLocationId
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllWarehouseLocations = async (req, res) => {
  try {
    const result = await warehouseLocationService.getAllWarehouseLocations();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addWarehouseLocation = async (req, res) => {
  try {
    const { data: warehouseLocations } = req.body;

    await warehouseLocationService.addWarehouseLocation(warehouseLocations);

    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addWarehouseLocations = async (req, res) => {
  try {
    const { data: warehouseLocations } = req.body;

    await warehouseLocationService.addWarehouseLocations(warehouseLocations);

    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWarehouseLocation = async (req, res) => {
  try {
    const { data: warehouseLocation } = req.body;

    await warehouseLocationService.updateWarehouseLocation(warehouseLocation);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWarehouseLocations = async (req, res) => {
  try {
    const { data: warehouseLocations } = req.body;

    await Promise.all(
      warehouseLocations.map((warehouseLocation) =>
        warehouseLocationService.updateWarehouseLocation(warehouseLocation)
      )
    );

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWarehouseLocation = async (req, res) => {
  try {
    const { data: warehouseLocation } = req.body;

    await warehouseLocationService.deleteWarehouseLocation(warehouseLocation);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWarehouseLocations = async (req, res) => {
  try {
    const { data: warehouseLocations } = req.body;

    await warehouseLocationService.deleteWarehouseLocations(warehouseLocations);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
