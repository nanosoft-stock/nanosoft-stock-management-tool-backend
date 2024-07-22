export const getItem = (itemId) => {
  const query = "SELECT * FROM items WHERE item_id = $1;";
  const values = [itemId];

  return { query, values };
};

export const getAllItems = () => {
  const query = "SELECT * FROM items ORDER BY item_id;";
  const values = [];

  return { query, values };
};

export const addItem = (item) => {
  const keys = Object.keys(item);

  let query = "INSERT INTO items (";
  const values = [];

  query += keys.join(", ");
  query += ") VALUES ";

  let index = 1;
  query += "(" + keys.map((_) => `$${index++}`).join(", ") + ")";
  values.push(...Object.values(item));

  query += " RETURNING *;";

  return { query, values };
};

export const addItems = (items) => {
  const keys = Object.keys(items[0]);

  let query = "INSERT INTO items (";
  const values = [];

  query += keys.join(", ");
  query += ") VALUES ";

  let index = 1;
  const insertStatements = [];

  for (let item of items) {
    insertStatements.push(
      "(" + keys.map((_) => `$${index++}`).join(", ") + ")"
    );
    for (let key of keys) {
      values.push(item[key]);
    }
  }

  query += insertStatements.join(", ");
  query += " RETURNING *;";

  return { query, values };
};

export const updateItem = (item) => {
  const { item_id: itemId, ...data } = item;
  let keys = Object.keys(data);

  let query = "UPDATE items SET ";
  const values = [];

  let index = 1;
  query += keys.map((key) => `${key} = $${index++}`).join(", ");
  values.push(...Object.values(data));

  query += ` WHERE item_id = $${index} RETURNING *;`;
  values.push(itemId);

  return { query, values };
};

export const deleteItem = (item) => {
  const query = "DelETE FROM items WHERE item_id = $1 RETURNING *;";
  const values = [item.item_id];

  return { query, values };
};

export const deleteItems = (items) => {
  let index = 1;
  let query = "DELETE FROM items WHERE item_id IN (";
  const values = [];

  query += items.map((_) => `$${index++}`).join(", ");
  values.push(...items);

  query += ") RETURNING *;";

  return { query, values };
};
