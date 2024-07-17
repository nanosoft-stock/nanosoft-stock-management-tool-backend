import { executeQuery } from "../config/db.js";
import * as itemService from "../services/item_services.js";

export const getAllItems = async (req, res) => {
  try {
    const { query, values } = itemService.getAllItems();
    const items = await executeQuery(query, values);

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewItem = async (req, res) => {
  try {
    const itemId = req.body.item_id;
    const { status } = req.body;

    const { query, values } = itemService.addNewItem(itemId, status);
    const item = await executeQuery(query, values);

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addNewItems = async (req, res) => {
  try {
    const body = req.body;

    const { query, values } = itemService.addNewItems(body);
    const items = await executeQuery(query, values);

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const itemId = req.params["item-id"];
    const { status } = req.body;

    const { query, values } = itemService.updateItem(itemId, status);
    const item = await executeQuery(query, values);

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
