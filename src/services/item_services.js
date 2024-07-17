export const getAllItems = async (database) => {
  try {
    const query = "SELECT * FROM items;";

    database.query("BEGIN;");
    const result = await database.query(query);
    database.query("COMMIT;");

    return result.rows;
  } catch (error) {
    database.query("ROLLBACK;");
    throw error;
  }
};

export const addNewItem = async (database, item_id, status) => {
  try {
    const query =
      "INSERT INTO items (item_id, status) VALUES ($1, $2) RETURNING *;";
      
    const values = [item_id, status];

    database.query("BEGIN;");
    const result = await database.query(query, values);
    database.query("COMMIT;");

    return result.rows;
  } catch (error) {
    database.query("ROLLBACK;");
    throw error;
  }
};

export const addNewItems = async (database, entries) => {
  try {
    const query = "INSERT INTO items (item_id, status) VALUES ";

    const values = [];
    let index = 1;

    query += entries
      .map((entry) => {
        values.push(entry.item_id, entry.status);
        return `($${index++}, $${index++})`;
      })
      .join(", ");

    query += " RETURNING *;";

    database.query("BEGIN;");
    const result = await database.query(query, values);
    database.query("COMMIT;");

    return result.rows;
  } catch (error) {
    database.query("ROLLBACK;");
    throw error;
  }
};

export const updateItem = async (database, item_id, status) => {
  try {
    const query =
      "UPDATE items SET (status = $1) WHERE item_id = $2 RETURNING *;";

    const values = [status, item_id];

    database.query("BEGIN;");
    const result = await database.query(query, values);
    database.query("COMMIT;");

    return result.rows;
  } catch (error) {
    database.query("ROLLBACK;");
    throw error;
  }
};
