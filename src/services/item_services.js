export const getAllItems = () => {
  const query = "SELECT * FROM items ORDER BY item_id;";
  const values = [];

  return { query, values };
};

export const addNewItem = (itemId, status) => {
  const query =
    "INSERT INTO items (item_id, status) VALUES ($1, $2) RETURNING *;";
  const values = [itemId, status];

  return { query, values };
};

export const addNewItems = (body) => {
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

  return { query, values };
};

export const updateItem = (itemId, status) => {
  const query = "UPDATE items SET status = $1 WHERE item_id = $2 RETURNING *;";
  const values = [status, itemId];

  return { query, values };
};
