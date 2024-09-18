import * as stockService from "../services/stock_services.js";

export const getAllStocks = async (req, res) => {
  try {
    await pool.query("BEGIN");
    const result = await stockService.getAllStocks();
    await pool.query("COMMIT");

    res.status(200).json(result);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const getStock = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    await pool.query("BEGIN");
    const result = await stockService.getStock(itemId);
    await pool.query("COMMIT");

    res.status(200).json(result);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addStock = async (req, res) => {
  try {
    const { data: stock } = req.body;

    await pool.query("BEGIN");
    await stockService.addStock(stock);
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const addStocks = async (req, res) => {
  try {
    const { data: stocks } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < stocks.length; i++) {
      await stockService.addStock(stocks[i]);
    }
    await pool.query("COMMIT");

    res.status(201).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateStock = async (req, res) => {
  try {
    const { data: stock } = req.body;

    await pool.query("BEGIN");
    await stockService.updateStock(stock);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const updateStocks = async (req, res) => {
  try {
    const { data: stocks } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < stocks.length; i++) {
      await stockService.updateStock(stocks[i]);
    }
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteStock = async (req, res) => {
  try {
    const { data: stock } = req.body;

    await pool.query("BEGIN");
    await stockService.deleteStock(stock);
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const deleteStocks = async (req, res) => {
  try {
    const { data: stocks } = req.body;

    await pool.query("BEGIN");
    for (let i = 0; i < stocks.length; i++) {
      await stockService.deleteStock(stocks[i]);
    }
    await pool.query("COMMIT");

    res.status(204).send();
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};

export const queryStocks = async (req, res) => {
  try {
    const { data: q } = req.body;

    await pool.query("BEGIN");
    const result = await stockService.queryStocks(q);
    await pool.query("COMMIT");

    res.status(200).json(result);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error });
  }
};
