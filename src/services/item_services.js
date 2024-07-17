export const getAllItems = () => {
  const query = "SELECT * FROM items;";
  const values = [];

  return { query, values };
};

export const addNewItem = (item_id, status) => {
  const query =
    "INSERT INTO items (item_id, status) VALUES ($1, $2) RETURNING *;";
  const values = [item_id, status];

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

export const updateItem = (item_id, status) => {
  const query = "UPDATE items SET status = $1 WHERE item_id = $2 RETURNING *;";
  const values = [status, item_id];

  return { query, values };
};
