import { executeQuery } from "../config/db.js";
import { queryBuilderHelper } from "../helpers/query_builder_helper.js";
import { postProcessStocks } from "../helpers/stock_helper.js";

const commonColumns = [
  "date",
  "category",
  "sku_uuid",
  "serial_number",
  "item_id",
  "container_id",
  "warehouse_location_id",
  "supplier_info",
  "comments",
  "user_uuid",
];

export const getStock = async (itemId) => {
  let query = "SELECT stocks.*, ";

  const categories = (
    await executeQuery("SELECT category FROM categories")
  ).map((category) => category["category"]);

  const selectClauses = [];
  const joinClauses = [];

  for (let category of categories) {
    const category_name = category;
    category = category.replace(" ", "_").toLowerCase();

    selectClauses.push(
      `row_to_json(${category}_specifications.*) AS ${category}`
    );
    joinClauses.push(
      `LEFT JOIN ${category}_specifications ON stocks.item_id = ${category}_specifications.item_id AND stocks.category = '${category_name}'`
    );
  }

  query += selectClauses.join(", ");
  query += ", users.username";
  query += " FROM stocks ";
  query += joinClauses.join(" ");
  query += " LEFT OUTER JOIN users ON stocks.user_uuid = users.user_uuid";
  query += " WHERE stocks.item_id = $1";

  const values = [itemId];

  const result = await executeQuery(query, values);

  return postProcessStocks(result);
};

export const getAllStocks = async () => {
  let query = "SELECT stocks.*, ";

  const categories = (
    await executeQuery("SELECT category FROM categories")
  ).map((category) => category["category"]);

  const selectClauses = [];
  const joinClauses = [];

  for (let category of categories) {
    const category_name = category;
    category = category.replace(" ", "_").toLowerCase();

    selectClauses.push(
      `row_to_json(${category}_specifications.*) AS ${category}`
    );
    joinClauses.push(
      `LEFT OUTER JOIN ${category}_specifications ON stocks.item_id = ${category}_specifications.item_id AND stocks.category = '${category_name}'`
    );
  }

  query += selectClauses.join(", ");
  query += ", users.username";
  query += " FROM stocks ";
  query += joinClauses.join(" ");
  query += ` LEFT OUTER JOIN users ON stocks.user_uuid = users.user_uuid`;
  query += " ORDER BY stocks.date DESC, stocks.item_id DESC LIMIT 100";

  const values = [];

  const result = await executeQuery(query, values);

  return postProcessStocks(result);
};

export const addStock = async (stock) => {
  const keys = Object.keys(stock);

  const stockColumns = {};
  const categoryBasedColumns = {};

  for (let key of keys) {
    if (key == "item_id") {
      categoryBasedColumns[key] = stock[key];
    }

    if (commonColumns.includes(key)) {
      stockColumns[key] = stock[key];
    } else {
      categoryBasedColumns[key] = stock[key];
    }
  }

  let stockQuery = "INSERT INTO stocks ";
  const stockValues = [];
  let index = 1;

  stockQuery += "(" + Object.keys(stockColumns).join(", ") + ")";
  stockQuery += " VALUES ";

  stockQuery +=
    "(" +
    Object.keys(stockColumns)
      .map((_) => `$${index++}`)
      .join(", ") +
    ")";

  stockValues.push(...Object.values(stockColumns));

  const categoryKey = stock.category.replace(" ", "_").toLowerCase();
  let categoryBasedQuery = `INSERT INTO ${categoryKey}_specifications `;
  const categoryBasedValues = [];
  index = 1;

  categoryBasedQuery +=
    "(" + Object.keys(categoryBasedColumns).join(", ") + ")";
  categoryBasedQuery += " VALUES ";

  categoryBasedQuery +=
    "(" +
    Object.keys(categoryBasedColumns)
      .map((_) => `$${index++}`)
      .join(", ") +
    ")";

  categoryBasedValues.push(...Object.values(categoryBasedColumns));

  await Promise.all([
    executeQuery(stockQuery, stockValues),
    executeQuery(categoryBasedQuery, categoryBasedValues)
  ]);
};

export const updateStock = async (stock) => {
  const keys = Object.keys(stock);

  const stockColumns = {};
  const categoryBasedColumns = {};
  const item_id = stock.item_id;

  for (let key of keys) {
    if (key == "item_id") {
      continue;
    }

    if (commonColumns.includes(key)) {
      stockColumns[key] = stock[key];
    } else {
      categoryBasedColumns[key] = stock[key];
    }
  }

  let stockQuery = "UPDATE stocks SET ";
  const stockValues = [];
  let index = 1;

  stockQuery += Object.keys(stockColumns)
    .map((key) => `${key} = $${index++}`)
    .join(", ");
  stockValues.push(...Object.values(stockColumns));

  stockQuery += ` WHERE item_id = $${index++}`;
  stockValues.push(item_id);

  const categoryKey = stock.category.replace(" ", "_").toLowerCase();
  let categoryBasedQuery = `UPDATE ${categoryKey}_specifications SET `;
  const categoryBasedValues = [];
  index = 1;

  categoryBasedQuery += Object.keys(categoryBasedColumns)
    .map((key) => `${key} = $${index++}`)
    .join(", ");
  categoryBasedValues.push(...Object.values(categoryBasedColumns));

  categoryBasedQuery += ` WHERE item_id = $${index++}`;
  categoryBasedValues.push(item_id);

  await Promise.all([
    executeQuery(stockQuery, stockValues),
    executeQuery(categoryBasedQuery, categoryBasedValues)
  ]);
};

export const deleteStock = async (stock) => {
  const stockQuery = `DELETE FROM stocks WHERE item_id = $1`;
  const stockValues = [stock.item_id];

  const st = await executeQuery(stockQuery, stockValues);

  const categoryKey = st[0].category.replace(" ", "_").toLowerCase();
  const categoryBasedQuery = `DELETE FROM ${categoryKey}_specifications WHERE item_id = $1`;
  const categoryBasedValues = [stock.item_id];

  await executeQuery(categoryBasedQuery, categoryBasedValues);
};

export const deleteStocks = async (stocks) => {
  let index = 1;
  let query = "DELETE FROM stocks WHERE item_id IN ";
  const values = [];

  query += "(" + stocks.map((_) => `$${index++}`).join(", ") + ")";
  values.push(...stocks.map((stock) => stock.item_id));

  const sts = await executeQuery(query, values);
  const executableQueries = [];

  for (let st of sts) {
    const categoryKey = st.category.replace(" ", "_").toLowerCase();

    const categoryBasedQuery = `DELETE FROM ${categoryKey}_specifications WHERE item_id = $1;`;
    const categoryBasedValues = [st.item_id];

    executableQueries.push(
      executeQuery(categoryBasedQuery, categoryBasedValues)
    );
  }

  await Promise.all(executableQueries);
};

export const queryStocks = async (q) => {
  q["from"] = "stocks";

  const { query, values } = queryBuilderHelper(q);

  const result = await executeQuery(query, values);

  return postProcessStocks(result);
};
