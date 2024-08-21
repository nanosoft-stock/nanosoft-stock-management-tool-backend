export const getStockLocationHistory = (slhUid) => {
  const query = "SELECT * FROM stock_location_history WHERE slh_uid = $1;";
  const values = [slhUid];
  return { query, values };
};

export const getAllStockLocationHistory = () => {
  const query = "SELECT * FROM stock_location_history ORDER BY date DESC;";
  const values = [];
  return { query, values };
};

export const addStockLocationHistory = (history) => {
  const keys = Object.keys(history);

  let query = "INSERT INTO stock_location_history (";
  const values = [];

  query += keys.join(", ");
  query += ") VALUES ";

  let index = 1;
  query += "(" + keys.map((_) => `$${index++}`).join(", ") + ")";
  values.push(...Object.values(history));

  query += " RETURNING *;";

  return { query, values };
};

export const addStockLocationHistories = (histories) => {
  const keys = Object.keys(histories[0]);

  let query = "INSERT INTO stock_location_history (";
  const values = [];

  query += keys.join(", ");
  query += ") VALUES ";

  let index = 1;
  const insertStatements = [];

  for (let history of histories) {
    insertStatements.push(
      "(" + keys.map((_) => `$${index++}`).join(", ") + ")"
    );
    for (let key of keys) {
      values.push(history[key]);
    }
  }

  query += insertStatements.join(", ");
  query += " RETURNING *;";

  return { query, values };
};

export const updateStockLocationHistory = (history) => {
  const { slf_uid: slhUid, ...data } = history;
  const keys = Object.keys(data);

  let query = "UPDATE stock_location_history SET ";
  const values = [];

  let index = 1;
  query += keys.map((key) => `${key} = $${index++}`).join(", ");
  values.push(...Object.values(data));

  query += ` WHERE slh_uid = $${index} RETURNING *;`;
  values.push(slhUid);

  return { query, values };
};

export const deleteStockLocationHistory = (slhUid) => {
  const query =
    "DELETE FROM stock_location_history WHERE slh_uid = $1 RETURNING *;";
  const values = [slhUid];
  return { query, values };
};

export const deleteStockLocationHistories = (slhUids) => {
  const query =
    "DELETE FROM stock_location_history WHERE slh_uid = ANY($1) RETURNING *;";
  const values = [slhUids];
  return { query, values };
};
