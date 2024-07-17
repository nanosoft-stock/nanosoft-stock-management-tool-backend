import { executeQuery } from "../config/db.js";
import * as userService from "../services/user_services.js";

export const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const user = await userService.getUserByEmail(executeQuery, email);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    const user = await userService.addNewUser(executeQuery, email, username);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const email = req.params.email;
    const body = req.body;

    const user = await userService.updateUser(executeQuery, email, body);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const email = req.params.email;

    const user = await userService.deleteUser(executeQuery, email);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
