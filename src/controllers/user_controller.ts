import { Request, Response } from "express";
import { pool } from "../config/db.js";
import { generateToken } from "../config/authorization.js";
import * as userService from "../services/user_services.js";
import { printDebugError } from "../helpers/print_error.js";

export const getUserByEmail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const email: string = req.params.email;

    const token = generateToken(email);

    await pool.query("BEGIN");
    const result: any[] = await userService.getUserByEmail(email);
    await pool.query("COMMIT");

    res.status(200).json({ data: result, token });
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const addNewUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: user } = req.body;

    await pool.query("BEGIN");
    await userService.addNewUser(user);
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: user } = req.body;

    await pool.query("BEGIN");
    await userService.updateUser(user);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data: user } = req.body;

    await pool.query("BEGIN");
    await userService.deleteUser(user);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    printDebugError(error);
    res.status(500).json({ error });
  }
};
