import { executeQuery } from "../config/db.js";
import * as containerService from "../services/container_services.js";

export const getAllContainers = async (req, res) => {
  try {
    const containers = await containerService.getAllContainers(executeQuery);

    res.status(200).json(containers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewContainer = async (req, res) => {
  try {
    const { container_id, status } = req.body;

    const containers = await containerService.addNewContainer(executeQuery, container_id, status);

    res.status(201).json(containers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewContainers = async (req, res) => {
  try {
    const body = req.body;

    const containers = await containerService.addNewContainers(executeQuery, body);

    res.status(200).json(containers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContainer = async (req, res) => {
  try {
    const container_id = req.params["container-id"];
    const { status } = req.body;

    const containers = await containerService.updateContainer(executeQuery, container_id, status);

    res.status(200).json(containers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
