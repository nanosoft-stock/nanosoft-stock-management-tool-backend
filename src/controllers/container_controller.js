import { executeQuery } from "../config/db.js";
import * as containerService from "../services/container_services.js";

export const getContainer = async (req, res) => {
  try {
    const containerId = req.params.containerId;

    const { query, values } = containerService.getContainer(containerId);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllContainers = async (req, res) => {
  try {
    const { query, values } = containerService.getAllContainers();
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addContainer = async (req, res) => {
  try {
    const { data: container } = req.body;

    const { query, values } = containerService.addContainer(container);
    const result = await executeQuery(query, values);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addContainers = async (req, res) => {
  try {
    const { data: containers } = req.body;

    const { query, values } = containerService.addContainers(containers);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContainer = async (req, res) => {
  try {
    const { data: container } = req.body;

    const { query, values } = containerService.updateContainer(container);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContainers = async (req, res) => {
  try {
    const { data: containers } = req.body;
    const result = [];

    for (let container of containers) {
      const { query, values } = containerService.updateContainer(container);
      result.push(...(await executeQuery(query, values)));
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContainer = async (req, res) => {
  try {
    const { data: container } = req.body;

    const { query, values } = containerService.deleteContainer(container);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContainers = async (req, res) => {
  try {
    const { data: containers } = req.body;

    const { query, values } = containerService.deleteContainers(containers);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
