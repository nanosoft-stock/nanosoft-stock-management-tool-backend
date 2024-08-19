import { executeQuery } from "../config/db.js";
import * as userService from "../services/user_services.js";

export const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const { query, values } = userService.getUserByEmail(email);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewUser = async (req, res) => {
  try {
    const { data: user } = req.body;

    const { query, values } = userService.addNewUser(user);
    const result = await executeQuery(query, values);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userUUID = req.params.userUUID;
    const { data: user } = req.body;

    const { query, values } = userService.updateUser(userUUID, user);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userUUID = req.params.userUUID;

    const { query, values } = userService.deleteUser(userUUID);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
