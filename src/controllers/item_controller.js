import { pool as database } from "../config/db.js";
import * as itemService from "../services/item_services.js";

export const getAllItems = async (req, res) => {
  try {
    const items = await itemService.getAllItems(database);

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewItem = async (req, res) => {
  try {
    const { item_id, status } = req.body;
    const items = await itemService.addNewItem(database, item_id, status);

    res.status(201).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewItems = async (req, res) => {
  try {
    const entries = req.body;
    const items = await itemService.addNewItems(database, entries);

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const item_id = req.params.itemId;
    const { status } = req.body;
    const items = await itemService.updateItem(database, item_id, status);

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
