import { executeQuery } from "../config/db.js";
import * as stockService from "../services/stock_services.js";
import { postProcessStocks } from "../helpers/stock_helper.js";

export const getStock = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    const { query, values } = await stockService.getStock(itemId, executeQuery);
    const result = await executeQuery(query, values);
    const processedResult = postProcessStocks(result);

    res.status(200).json(processedResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllStocks = async (req, res) => {
  try {
    const { query, values } = await stockService.getAllStocks(executeQuery);
    const result = await executeQuery(query, values);
    const processedResult = postProcessStocks(result);

    res.status(200).json(processedResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addStock = async (req, res) => {
  try {
    const { data: stock } = req.body;

    const { query, values } = await stockService.addStock(stock, executeQuery);
    const result = await executeQuery(query, values);
    const processedResult = postProcessStocks(result);

    res.status(201).json(processedResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addStocks = async (req, res) => {
  try {
    const { data: stocks } = req.body;
    const processedResult = [];

    for (let stock of stocks) {
      const { query, values } = await stockService.addStock(
        stock,
        executeQuery
      );
      const result = await executeQuery(query, values);
      processedResult.push(...postProcessStocks(result));
    }

    res.status(200).json(processedResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    const { data: stock } = req.body;

    const { query, values } = await stockService.updateStock(
      stock,
      executeQuery
    );
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStocks = async (req, res) => {
  try {
    const { data: stocks } = req.body;
    const result = [];

    for (let stock of stocks) {
      const { query, values } = await stockService.updateStock(
        stock,
        executeQuery
      );
      result.push(await executeQuery(query, values));
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStock = async (req, res) => {
  try {
    const { data: stock } = req.body;

    const { query, values } = await stockService.deleteStock(
      stock,
      executeQuery
    );
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStocks = async (req, res) => {
  try {
    const { data: stocks } = req.body;

    const { query, values } = await stockService.deleteStocks(
      stocks,
      executeQuery
    );
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const queryStocks = async (req, res) => {
  try {
    const { data: q } = req.body;

    const { query, values } = await stockService.queryStocks(q, executeQuery);
    const result = await executeQuery(query, values);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
