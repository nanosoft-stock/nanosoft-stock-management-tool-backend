import { Request, Response } from "express";
import { pool } from "../config/db.js";
import * as preferenceService from "../services/preference_services.js";

export const getUserPreference = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.query.user_id;

    if (typeof userId != "string" && typeof userId != "number") {
      throw new TypeError("Invalid user_id");
    }

    await pool.query("BEGIN");
    const result: any[] = await preferenceService.getUserPreference(userId);
    await pool.query("COMMIT");

    res.status(200).send({ data: result });
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addUserPreference = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: preference } = req.body;

    await pool.query("BEGIN");
    await preferenceService.addUserPreference(preference);
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateUserPreference = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: preference } = req.body;

    await pool.query("BEGIN");
    await preferenceService.updateUserPreference(preference);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteUserPreference = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: preference } = req.body;

    await pool.query("BEGIN");
    await preferenceService.deleteUserPreference(preference);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const getUserTablePreference = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = req.query.id;
    const userId = req.query.user_id;

    if (typeof id != "string" && typeof id != "number") {
      throw new TypeError("Invalid id");
    }

    if (typeof userId != "string" && typeof userId != "number") {
      throw new TypeError("Invalid user_id");
    }

    await pool.query("BEGIN");
    const result: any[] = await preferenceService.getUserTablePreference(
      id,
      userId,
    );
    await pool.query("COMMIT");

    res.status(200).send({ data: result });
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const getAllUserTablePreferences = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.query.user_id;

    if (typeof userId != "string" && typeof userId != "number") {
      throw new TypeError("Invalid user_id");
    }

    await pool.query("BEGIN");
    const result: any[] =
      await preferenceService.getAllUserTablePreferences(userId);
    await pool.query("COMMIT");

    res.status(200).send({ data: result });
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const getUserCurrentTablePreference = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.query.user_id;

    if (typeof userId != "string" && typeof userId != "number") {
      throw new TypeError("Invalid user_id");
    }

    await pool.query("BEGIN");
    const result: any[] =
      await preferenceService.getUserCurrentTablePreference(userId);
    await pool.query("COMMIT");

    res.status(200).send({ data: result });
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addUserTablePreference = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: preference } = req.body;

    await pool.query("BEGIN");
    await preferenceService.addUserTablePreference(preference);
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateUserTablePreference = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: preference } = req.body;

    await pool.query("BEGIN");
    await preferenceService.updateUserTablePreference(preference);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteUserTablePreference = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: preference } = req.body;

    await pool.query("BEGIN");
    await preferenceService.deleteUserTablePreference(preference);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};
