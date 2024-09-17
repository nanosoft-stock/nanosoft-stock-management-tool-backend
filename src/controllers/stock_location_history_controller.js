import * as slhService from "../services/stock_location_history_service.js";

export const getAllStockLocationHistory = async (req, res) => {
  try {
    await pool.query("BEGIN");
    const result = await slhService.getAllStockLocationHistory();
    await pool.query("COMMIT");

    res.status(200).json(result);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const getStockLocationHistory = async (req, res) => {
  try {
    const id = req.params.id;

    await pool.query("BEGIN");
    const result = await slhService.getStockLocationHistory(id);
    await pool.query("COMMIT");

    res.status(200).json(result);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addStockLocationHistory = async (req, res) => {
  try {
    const { data: history } = req.body;

    await pool.query("BEGIN");
    await slhService.addStockLocationHistory(history);
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addStockLocationHistories = async (req, res) => {
  try {
    const { data: histories } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < histories.length; i++) {
      await slhService.addStockLocationHistory(histories[i]);
    }
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateStockLocationHistory = async (req, res) => {
  try {
    const { data: history } = req.body;

    await pool.query("BEGIN");
    await slhService.updateStockLocationHistory(history);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateStockLocationHistories = async (req, res) => {
  try {
    const { data: histories } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < histories.length; i++) {
      await slhService.updateStockLocationHistory(histories[i]);
    }
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteStockLocationHistory = async (req, res) => {
  try {
    const { data: history } = req.body;

    await pool.query("BEGIN");
    await slhService.deleteStockLocationHistory(history);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteStockLocationHistories = async (req, res) => {
  try {
    const { data: histories } = req.body;

    await pool.query("BEGIN");
    await slhService.deleteStockLocationHistories(histories);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const queryStockLocationHistory = async (req, res) => {
  try {
    const { data: q } = req.body;

    await pool.query("BEGIN");
    const result = await slhService.queryStockLocationHistory(q);
    await pool.query("COMMIT");

    res.status(200).json(result);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};
