import { executeQuery } from "../config/db.js";
import * as userService from "../services/user_services.js";

export const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const { query, values } = userService.getUserByEmail(email);
    const user = await executeQuery(query, values);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    const { query, values } = userService.addNewUser(email, username);
    const user = await executeQuery(query, values);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const email = req.params.email;
    const body = req.body;

    const { query, values } = userService.updateUser(email, body);
    const user = await executeQuery(query, values);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const email = req.params.email;

    const { query, values } = userService.deleteUser(email);
    const user = await executeQuery(query, values);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
