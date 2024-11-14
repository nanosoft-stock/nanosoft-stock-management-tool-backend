import { QueryResult } from "pg";
import { pool } from "../config/db.js";
import { queryBuilderHelper } from "../helpers/query_builder_helper.js";
import { postProcessStocks } from "../helpers/stock_helper.js";

const commonColumns = [
  "date",
  "item_id",
  "category",
  "sku",
  "serial_number",
  "container_id",
  "warehouse_location_id",
  "supplier_info",
  "comments",
  "user_id",
];

export const getAllStocks = async (): Promise<any[]> => {
  const query = `SELECT * FROM stocks_view ORDER BY date DESC, item_id DESC LIMIT 100`;
  const values = [];

  const result: QueryResult = await pool.query(query, values);

  return result.rows;
};

export const getStock = async (itemId: string): Promise<any[]> => {
  const query = `SELECT * FROM stocks_view WHERE item_id = $1`;
  const values = [itemId];

  const result: QueryResult = await pool.query(query, values);

  return result.rows;
};

export const addStock = async (stock): Promise<void> => {
  const stockQuery = `INSERT INTO stocks 
                      (item_fid, category_fid, sku_fid, serial_number, container_fid, warehouse_location_fid, supplier_info, comments, user_fid) 
                      SELECT items.id, categories.id, skus.id, $1, containers.id, warehouse_locations.id, $2, $3, $4 
                      FROM items
                      LEFT JOIN categories ON categories.category = $5 
                      LEFT JOIN skus ON skus.sku = $6 
                      LEFT JOIN containers ON containers.container_id = $7 
                      LEFT JOIN warehouse_locations ON warehouse_locations.warehouse_location_id = $8 
                      WHERE items.item_id = $9`;
  const stockValues = [
    stock.serial_number,
    stock.supplier_info,
    stock.comments,
    stock.user_id,
    stock.category,
    stock.sku,
    stock.container_id,
    stock.warehouse_location_id,
    stock.item_id,
  ];

  const keys = Object.keys(stock);
  const categoryBasedColumns = {};

  for (const key of keys) {
    if (!commonColumns.includes(key)) {
      categoryBasedColumns[key] = stock[key];
    }
  }

  await pool.query(stockQuery, stockValues);

  const categoryKeys = Object.keys(categoryBasedColumns);

  if (categoryKeys.length != 0) {
    let index = 1;
    const categoryKey = stock.category.replace(` `, `_`).toLowerCase();

    const categoryBasedQuery = `INSERT INTO ${categoryKey}_specifications 
                                (item_fid, ${categoryKeys.join(", ")}) 
                                SELECT items.id, ${categoryKeys.map(() => `$${index++}`).join(", ")} 
                                FROM items WHERE items.item_id = $${index++}`;
    const categoryBasedValues = [
      ...Object.values(categoryBasedColumns),
      stock.item_id,
    ];

    await pool.query(categoryBasedQuery, categoryBasedValues);
  }
};

export const updateStock = async (stock): Promise<void> => {
  const stockQuery = `UPDATE stocks SET
                      category_fid = COALESCE((SELECT id FROM categories WHERE category_id = $1), category_fid), 
                      skus_fid = COALESCE((SELECT id FROM skus WHERE sku_id = $2), sku_fid), 
                      serial_number = COALESCE($3, serial_number), 
                      container_fid = COALESCE((SELECT id FROM containers WHERE container_id = $4), container_fid), 
                      warehouse_location_fid = COALESCE((SELECT id FROM warehouse_locations WHERE warehouse_location_id = $5), warehouse_location_fid), 
                      supplier_info = COALESCE($6, supplier_info), 
                      comments = COALESCE($7, comments) 
                      FROM items 
                      where items.item_id = $8`;

  const stockValues = [
    stock.category,
    stock.sku,
    stock.serial_number,
    stock.container_id,
    stock.warehouse_location_id,
    stock.supplier_info,
    stock.comments,
    stock.item_id,
  ];

  const keys = Object.keys(stock);
  const categoryBasedColumns = {};

  for (const key of keys) {
    if (!commonColumns.includes(key)) {
      categoryBasedColumns[key] = stock[key];
    }
  }

  await pool.query(stockQuery, stockValues);

  const categoryKeys = Object.keys(categoryBasedColumns);

  if (categoryKeys.length != 0) {
    let index = 1;
    const categoryKey = stock.category.replace(" ", "_").toLowerCase();

    const categoryBasedQuery = `UPDATE ${categoryKey}_specifications 
                                ${categoryKeys.map((key) => `${key} = COALESCE(${index++}, ${key})`).join(", ")}
                                WHERE item_fid = (SELECT id FROM items WHERE item_id = ${index++})`;
    const categoryBasedValues = [
      ...categoryKeys.map((key) => stock[key]),
      stock.item_id,
    ];

    await pool.query(categoryBasedQuery, categoryBasedValues);
  }
};

export const deleteStock = async (stock): Promise<void> => {
  const stocksQuery = `DELETE FROM stocks 
                       USING items 
                       WHERE items.id = stocks.item_fid AND items.item_id = $1`;
  const stocksValues = [stock.item_id];

  const categoryKey = stock.category.replace(" ", "_").toLowerCase();
  const categoryBasedQuery = `DELETE FROM ${categoryKey}_specifications AS spec
                              USING items 
                              WHERE items.id = spec.item_fid AND items.item_id = $1`;
  const categoryBasedValues = [stock.item_id];

  await pool.query(categoryBasedQuery, categoryBasedValues);
  await pool.query(stocksQuery, stocksValues);
};

export const queryStocks = async (q): Promise<any[]> => {
  q["from"] = "stocks_view";

  const { query, values } = queryBuilderHelper(q);

  const result: QueryResult = await pool.query(query, values);

  return postProcessStocks(result.rows);
};
