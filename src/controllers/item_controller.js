import { executeQuery } from "../config/db.js";
import * as itemService from "../services/item_services.js";

export const getItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    const { query, values } = itemService.getItem(itemId);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const { query, values } = itemService.getAllItems();
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addItem = async (req, res) => {
  try {
    const { data: item } = req.body;

    const { query, values } = itemService.addItem(item);
    const result = await executeQuery(query, values);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addItems = async (req, res) => {
  try {
    const { data: items } = req.body;

    const { query, values } = itemService.addItems(items);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const {data: item} = req.body;

    const { query, values } = itemService.updateItem(item);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateItems = async (req, res) => {
  try {
    const {data: items} = req.body;
    const result = [];

    for (let item of items) {
      const { query, values } = itemService.updateItem(item);
      result.push(...(await executeQuery(query, values)));
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const {data: item} = req.body;

    const { query, values } = itemService.deleteItem(item);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteItems = async (req, res) => {
  try {
    const {data: items} = req.body;

    const { query, values } = itemService.deleteItems(items);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};