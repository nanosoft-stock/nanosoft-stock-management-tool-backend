import { pool } from "../config/db.js";
import * as userService from "../services/user_services.js";

export const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    await pool.query("BEGIN");
    const result = await userService.getUserByEmail(email);
    await pool.query("COMMIT");

    res.status(200).json(result);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addNewUser = async (req, res) => {
  try {
    const { data: user } = req.body;

    await pool.query("BEGIN");
    await userService.addNewUser(user);
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { data } = req.body;
    const { id, ...user } = data;

    await pool.query("BEGIN");
    await userService.updateUser(id, user);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { data } = req.body;
    const { id } = data;

    await pool.query("BEGIN");
    await userService.deleteUser(id);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};
