import * as slhService from "../services/stock_location_history_service.js";

export const getStockLocationHistory = async (req, res) => {
  try {
    const slhUuid = req.params.slhUuid;

    const result = await slhService.getStockLocationHistory(slhUuid);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllStockLocationHistory = async (req, res) => {
  try {
    const result = await slhService.getAllStockLocationHistory();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addStockLocationHistory = async (req, res) => {
  try {
    const { data: history } = req.body;

    await slhService.addStockLocationHistory(history);

    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addStockLocationHistories = async (req, res) => {
  try {
    const { data: histories } = req.body;

    await slhService.addStockLocationHistories(histories);

    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStockLocationHistory = async (req, res) => {
  try {
    const { data: history } = req.body;

    await slhService.updateStockLocationHistory(history);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStockLocationHistories = async (req, res) => {
  try {
    const { data: histories } = req.body;

    await Promise.all(
      histories.map((history) => slhService.updateStockLocationHistory(history))
    );

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStockLocationHistory = async (req, res) => {
  try {
    const { data: history } = req.body;

    await slhService.deleteStockLocationHistory(history);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStockLocationHistories = async (req, res) => {
  try {
    const { data: histories } = req.body;

    await slhService.deleteStockLocationHistories(histories);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const queryStockLocationHistory = async (req, res) => {
  try {
    const { data: q } = req.body;

    const result = await slhService.queryStockLocationHistory(q);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
