import { executeQuery } from "../config/db.js";
import * as slhService from "../services/stock_location_history_service.js";

export const getStockLocationHistory = async (req, res) => {
  try {
    const slhUid = req.params.slhUid;

    const { query, values } = slhService.getStockLocationHistory(slhUid);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllStockLocationHistory = async (req, res) => {
  try {
    const { query, values } = slhService.getAllStockLocationHistory();
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addStockLocationHistory = async (req, res) => {
  try {
    const { data: history } = req.body;

    const { query, values } = slhService.addStockLocationHistory(history);
    const result = await executeQuery(query, values);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addStockLocationHistories = async (req, res) => {
  try {
    const { data: histories } = req.body;

    const { query, values } = slhService.addStockLocationHistories(histories);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStockLocationHistory = async (req, res) => {
  try {
    const { data: history } = req.body;

    const { query, values } = slhService.updateStockLocationHistory(history);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStockLocationHistories = async (req, res) => {
  try {
    const { data: histories } = req.body;
    const result = [];

    for (let history of histories) {
      const { query, values } = slhService.updateStockLocationHistory(history);
      result.push(...(await executeQuery(query, values)));
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStockLocationHistory = async (req, res) => {
  try {
    const { data: slhUid } = req.body;

    const { query, values } = slhService.deleteStockLocationHistory(slhUid);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStockLocationHistories = async (req, res) => {
  try {
    const { data: slhUids } = req.body;

    const { query, values } = slhService.deleteStockLocationHistories(slhUids);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
