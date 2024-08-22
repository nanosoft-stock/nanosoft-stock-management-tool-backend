import { executeQuery } from "../config/db.js";

export const getItem = async (itemId) => {
  const query = "SELECT * FROM items WHERE item_id = $1";
  const values = [itemId];

  const result = await executeQuery(query, values);

  return result;
};

export const getAllItems = async () => {
  const query = "SELECT * FROM items ORDER BY item_id";
  const values = [];

  const result = await executeQuery(query, values);

  return result;
};

export const addItem = async (item) => {
  const keys = Object.keys(item);

  let query = "INSERT INTO items ";
  const values = [];

  query += "(" + keys.join(", ") + ")";
  query += " VALUES ";

  let index = 1;
  query += "(" + keys.map((_) => `$${index++}`).join(", ") + ")";
  values.push(...Object.values(item));

  await executeQuery(query, values);
};

export const addItems = async (items) => {
  const keys = Object.keys(items[0]);

  let query = "INSERT INTO items ";
  const values = [];

  query += "(" + keys.join(", ") + ")";
  query += " VALUES ";

  let index = 1;
  const insertStatements = [];

  for (let item of items) {
    insertStatements.push(
      "(" + keys.map((_) => `$${index++}`).join(", ") + ")"
    );
    values.push(...Object.values(item));
  }

  query += insertStatements.join(", ");

  await executeQuery(query, values);
};

export const updateItem = async (item) => {
  const { item_id: itemId, ...data } = item;
  let keys = Object.keys(data);

  let query = "UPDATE items SET ";
  const values = [];

  let index = 1;
  query += keys.map((key) => `${key} = $${index++}`).join(", ");
  values.push(...Object.values(data));

  query += ` WHERE item_id = $${index}`;
  values.push(itemId);

  await executeQuery(query, values);
};

export const deleteItem = async (item) => {
  const query = "DELETE FROM items WHERE item_id = $1";
  const values = [item.item_id];

  await executeQuery(query, values);
};

export const deleteItems = async (items) => {
  let query = "DELETE FROM items WHERE item_id IN ";
  const values = [];
  let index = 1;

  query += "(" + items.map((_) => `$${index++}`).join(", ") + ")";
  values.push(...items.map((item) => item.item_id));

  await executeQuery(query, values);
};
