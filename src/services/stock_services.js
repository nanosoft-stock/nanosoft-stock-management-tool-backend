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
  "email",
];

export const getAllStocks = async () => {
  const query = `SELECT * FROM stocks_view ORDER BY date DESC, item_id DESC LIMIT 100`;
  const values = [];

  const result = await pool.query(query, values);

  return result.rows;
};

export const getStock = async (itemId) => {
  const query = `SELECT * FROM stocks_view WHERE item_id = $1`;
  const values = [itemId];

  const result = await pool.query(query, values);

  return result.rows;
};

export const addStock = async (stock) => {
  const stockQuery = `INSERT INTO stocks 
                      (date, item_fid, category_fid, sku_fid, serial_number, container_fid, warehouse_location_fid, supplier_info, comments, user_fid) 
                      SELECT $1, items.id, categories.id, skus.id, $2, containers.id, warehouse_locations.id, $3, $4, users.id 
                      FROM users
                      LEFT JOIN items ON items.item_id = $5  
                      LEFT JOIN categories ON categories.category = $6 
                      LEFT JOIN skus ON skus.sku = $7 
                      LEFT JOIN containers ON containers.container_id = $8 
                      LEFT JOIN warehouse_locations ON warehouse_locations.warehouse_location_id = $9 
                      WHERE users.email = $10`;
  const stockValues = [
    stock.date,
    stock.serial_number,
    stock.supplier_info,
    stock.comments,
    stock.item_id,
    stock.category,
    stock.sku,
    stock.container_id,
    stock.warehouse_location_id,
    stock.email,
  ];

  const keys = Object.keys(stock);
  const categoryBasedColumns = {};

  for (let key of keys) {
    if (!commonColumns.includes(key)) {
      categoryBasedColumns[key] = stock[key];
    }
  }

  const categoryKeys = Object.keys(categoryBasedColumns);

  let index = 1;
  const categoryKey = stock.category.replace(` `, `_`).toLowerCase();
  const categoryBasedQuery = `INSERT INTO ${categoryKey}_specifications 
        (item_fid, ${categoryKeys.join(", ")}) 
        SELECT items.id, ${categoryKeys.map((_) => `$${index++}`).join(", ")} 
        FROM items WHERE items.item_id = $${index++}`;
  const categoryBasedValues = [
    ...Object.values(categoryBasedColumns),
    stock.item_id,
  ];

  await pool.query(stockQuery, stockValues);
  await pool.query(categoryBasedQuery, categoryBasedValues);
};

export const updateStock = async (stock) => {
  `UPDATE stocks SET
   date = COALESCE($1, date), 
   item_fid = COALESCE((SELECT id FROM items WHERE item_id = $2), item_fid), 
   category_fid = COALESCE((SELECT id FROM categories WHERE container_id = $2), container_fid), 
   container_fid = COALESCE((SELECT id FROM containers WHERE container_id = $2), container_fid), 
   warehouse_location_fid = COALESCE((SELECT id FROM warehouse_locations WHERE warehouse_location_id = $2), warehouse_location_fid), 
   warehouse_location_fid = COALESCE((SELECT id FROM warehouse_locations WHERE warehouse_location_id = $2), warehouse_location_fid), 
   `
};

// export const addStock = async (stock) => {
//   const keys = Object.keys(stock);

//   const stockColumns = {};
//   const categoryBasedColumns = {};

//   for (let key of keys) {
//     if (key == `item_id`) {
//       categoryBasedColumns[key] = stock[key];
//     }

//     if (commonColumns.includes(key)) {
//       stockColumns[key] = stock[key];
//     } else {
//       categoryBasedColumns[key] = stock[key];
//     }
//   }

//   let stockQuery = `INSERT INTO stocks `;
//   const stockValues = [];
//   let index = 1;

//   stockQuery += `(` + Object.keys(stockColumns).join(`, `) + `)`;
//   stockQuery += ` VALUES `;

//   stockQuery +=
//     `(` +
//     Object.keys(stockColumns)
//       .map((_) => `$${index++}`)
//       .join(`, `) +
//     `)`;

//   stockValues.push(...Object.values(stockColumns));

//   const categoryKey = stock.category.replace(` `, `_`).toLowerCase();
//   let categoryBasedQuery = `INSERT INTO ${categoryKey}_specifications `;
//   const categoryBasedValues = [];
//   index = 1;

//   categoryBasedQuery +=
//     `(` + Object.keys(categoryBasedColumns).join(`, `) + `)`;
//   categoryBasedQuery += ` VALUES `;

//   categoryBasedQuery +=
//     `(` +
//     Object.keys(categoryBasedColumns)
//       .map((_) => `$${index++}`)
//       .join(`, `) +
//     `)`;

//   categoryBasedValues.push(...Object.values(categoryBasedColumns));

//   await Promise.all([
//     pool.query(stockQuery, stockValues),
//     pool.query(categoryBasedQuery, categoryBasedValues),
//   ]);
// };

// export const updateStock = async (stock) => {
//   const keys = Object.keys(stock);

//   const stockColumns = {};
//   const categoryBasedColumns = {};
//   const item_id = stock.item_id;

//   for (let key of keys) {
//     if (key == `item_id`) {
//       continue;
//     }

//     if (commonColumns.includes(key)) {
//       stockColumns[key] = stock[key];
//     } else {
//       categoryBasedColumns[key] = stock[key];
//     }
//   }

//   let stockQuery = `UPDATE stocks SET `;
//   const stockValues = [];
//   let index = 1;

//   stockQuery += Object.keys(stockColumns)
//     .map((key) => `${key} = $${index++}`)
//     .join(`, `);
//   stockValues.push(...Object.values(stockColumns));

//   stockQuery += ` WHERE item_id = $${index++}`;
//   stockValues.push(item_id);

//   const categoryKey = stock.category.replace(` `, `_`).toLowerCase();
//   let categoryBasedQuery = `UPDATE ${categoryKey}_specifications SET `;
//   const categoryBasedValues = [];
//   index = 1;

//   categoryBasedQuery += Object.keys(categoryBasedColumns)
//     .map((key) => `${key} = $${index++}`)
//     .join(`, `);
//   categoryBasedValues.push(...Object.values(categoryBasedColumns));

//   categoryBasedQuery += ` WHERE item_id = $${index++}`;
//   categoryBasedValues.push(item_id);

//   await Promise.all([
//     pool.query(stockQuery, stockValues),
//     pool.query(categoryBasedQuery, categoryBasedValues),
//   ]);
// };

export const deleteStock = async (stock) => {
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

export const queryStocks = async (q) => {
  q[`from`] = `stocks`;

  const { query, values } = queryBuilderHelper(q);

  const result = await pool.query(query, values);

  return postProcessStocks(result);
};
