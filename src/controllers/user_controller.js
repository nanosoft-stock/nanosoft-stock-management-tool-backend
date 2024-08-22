import * as userService from "../services/user_services.js";

export const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const result = await userService.getUserByEmail(email);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewUser = async (req, res) => {
  try {
    const { data: user } = req.body;

    await userService.addNewUser(user);

    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userUUID = req.params.userUUID;
    const { data: user } = req.body;

    await userService.updateUser(userUUID, user);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userUUID = req.params.userUUID;

    await userService.deleteUser(userUUID);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
