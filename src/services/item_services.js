export const getAllItems = async (executeQuery) => {
  const query = "SELECT * FROM items;";
  const values = [];

  return await executeQuery(query, values);
};

export const addNewItem = async (executeQuery, item_id, status) => {
  const query =
    "INSERT INTO items (item_id, status) VALUES ($1, $2) RETURNING *;";
  const values = [item_id, status];

  return await executeQuery(query, values);
};

export const addNewItems = async (executeQuery, body) => {
  let query = "INSERT INTO items (item_id, status) VALUES ";
  const values = [];

  let index = 1;
  query += body
    .map((entry) => {
      values.push(entry.item_id, entry.status);
      return `($${index++}, $${index++})`;
    })
    .join(", ");

  query += " RETURNING *;";

  return await executeQuery(query, values);
};

export const updateItem = async (executeQuery, item_id, status) => {
  const query =
    "UPDATE items SET status = $1 WHERE item_id = $2 RETURNING *;";
  const values = [status, item_id];

  return await executeQuery(query, values);
};
