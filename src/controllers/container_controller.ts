import { Request, Response } from "express";
import { pool } from "../config/db.js";
import * as containerService from "../services/container_services.js";

export const getAllContainers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    await pool.query("BEGIN");
    const result: any[] = await containerService.getAllContainers();
    await pool.query("COMMIT");

    res.status(200).json({ data: result });
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const getContainer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const containerId: string = req.params.containerId;

    await pool.query("BEGIN");
    const result: any[] = await containerService.getContainer(containerId);
    await pool.query("COMMIT");

    res.status(200).json({ data: result });
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addContainer = async (
  req: Request,
  res: Response,
): Promise<void> => {
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

export const addContainers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: containers } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < containers.length; i++) {
      await containerService.addContainer(containers[i]);
    }
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateContainer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: container } = req.body;

    await pool.query("BEGIN");
    await containerService.updateContainer(container);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateContainers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: containers } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < containers.length; i++) {
      await containerService.updateContainer(containers[i]);
    }
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteContainer = async (
  req: Request,
  res: Response,
): Promise<void> => {
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

export const deleteContainers = async (
  req: Request,
  res: Response,
): Promise<void> => {
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

export const generateNewContainers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { count, user_id: userId } = req.body.data;

    await pool.query("BEGIN");
    const result: any[] = await containerService.generateNewContainers(
      count,
      userId,
    );
    await pool.query("COMMIT");

    res.status(201).json({ data: result });
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteGeneratedContainers = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
