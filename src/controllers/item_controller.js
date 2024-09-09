import * as itemService from "../services/item_services.js";

export const getItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    const result = await itemService.getItem(itemId);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const result = await itemService.getAllItems();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addItem = async (req, res) => {
  try {
    const { data: item } = req.body;

    await itemService.addItem(item);

    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addItems = async (req, res) => {
  try {
    const { data: items } = req.body;

    await itemService.addItems(items);

    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { data: item } = req.body;

    await itemService.updateItem(item);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateItems = async (req, res) => {
  try {
    const { data: items } = req.body;

    await Promise.all(items.map((item) => itemService.updateItem(item)));

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { data: item } = req.body;

    await itemService.deleteItem(item);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteItems = async (req, res) => {
  try {
    const { data: items } = req.body;

    await itemService.deleteItems(items);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateNewItems = async (req, res) => {
  try {
    const { count } = req.body.data;

    const result = await itemService.generateNewItems(count);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGeneratedItems = async (req, res) => {
  try {
    const { start, end } = req.body.data;

    await itemService.deleteGeneratedItems(start, end);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
