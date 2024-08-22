import * as stockService from "../services/stock_services.js";

export const getStock = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    const result = await stockService.getStock(itemId);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllStocks = async (req, res) => {
  try {
    const result = await stockService.getAllStocks();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addStock = async (req, res) => {
  try {
    const { data: stock } = req.body;

    await stockService.addStock(stock);

    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addStocks = async (req, res) => {
  try {
    const { data: stocks } = req.body;

    await Promise.all(
      stocks.map(async (stock) => stockService.addStock(stock))
    );

    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    const { data: stock } = req.body;

    await stockService.updateStock(stock);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStocks = async (req, res) => {
  try {
    const { data: stocks } = req.body;

    await Promise.all(
      stocks.map(async (stock) => stockService.updateStock(stock))
    );

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStock = async (req, res) => {
  try {
    const { data: stock } = req.body;

    await stockService.deleteStock(stock);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStocks = async (req, res) => {
  try {
    const { data: stocks } = req.body;

    await stockService.deleteStocks(stocks);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const queryStocks = async (req, res) => {
  try {
    const { data: q } = req.body;

    const result = await stockService.queryStocks(q);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
