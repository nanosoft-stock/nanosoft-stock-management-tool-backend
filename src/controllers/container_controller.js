import { pool } from "../config/db.js";
import * as containerService from "../services/container_services.js";

export const getAllContainers = async (req, res) => {
  try {
    await pool.query("BEGIN");
    const result = await containerService.getAllContainers();
    await pool.query("COMMIT");

    res.status(200).json(result);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const getContainer = async (req, res) => {
  try {
    const containerId = req.params.containerId;

    await pool.query("BEGIN");
    const result = await containerService.getContainer(containerId);
    await pool.query("COMMIT");

    res.status(200).json(result);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addContainer = async (req, res) => {
  try {
    const { data: container } = req.body;

    await pool.query("BEGIN");
    await containerService.addContainer(container);
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addContainers = async (req, res) => {
  try {
    const { data: containers } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < containers.length; i++) {
      const container = containers[i];
      await containerService.addContainer(container);
    }
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateContainer = async (req, res) => {
  try {
    const { data } = req.body;
    const { id, ...container } = data;

    await pool.query("BEGIN");
    await containerService.updateContainer(container);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateContainers = async (req, res) => {
  try {
    const { data: containers } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < containers.length; i++) {
      const { id, ...container } = containers[i];
      await containerService.updateContainer(id, container);
    }
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteContainer = async (req, res) => {
  try {
    const { data: container } = req.body;

    await pool.query("BEGIN");
    await containerService.deleteContainer(container);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteContainers = async (req, res) => {
  try {
    const { data: containers } = req.body;

    await pool.query("BEGIN");
    await containerService.deleteContainers(containers);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const generateNewContainers = async (req, res) => {
  try {
    const { count } = req.body.data;

    await pool.query("BEGIN");
    const result = await containerService.generateNewContainers(count);
    await pool.query("COMMIT");

    res.status(201).json(result);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteGeneratedContainers = async (req, res) => {
  try {
    const { start, end } = req.body.data;

    await pool.query("BEGIN");
    await containerService.deleteGeneratedContainers(start, end);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};
