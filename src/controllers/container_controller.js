import { executeQuery } from "../config/db.js";
import * as containerService from "../services/container_services.js";

export const getAllContainers = async (req, res) => {
  try {
    const { query, values } = containerService.getAllContainers();
    const containers = await executeQuery(query, values);

    res.status(200).json(containers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewContainer = async (req, res) => {
  try {
    const containerId = req.body.container_id;
    const { status } = req.body;

    const { query, values } = containerService.addNewContainer(
      containerId,
      status
    );
    const container = await executeQuery(query, values);

    res.status(201).json(container);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewContainers = async (req, res) => {
  try {
    const body = req.body;

    const { query, values } = containerService.addNewContainers(body);
    const containers = await executeQuery(query, values);

    res.status(200).json(containers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContainer = async (req, res) => {
  try {
    const containerId = req.params.containerId;
    const { status } = req.body;

    const { query, values } = containerService.updateContainer(
      containerId,
      status
    );
    const container = await executeQuery(query, values);

    res.status(200).json(container);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
