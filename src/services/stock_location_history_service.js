import { executeQuery } from "../config/db.js";
import { queryBuilderHelper } from "../helpers/query_builder_helper.js";

export const getStockLocationHistory = async (slhUuid) => {
  const query =
    "SELECT stock_location_history.*, users.username FROM stock_location_history LEFT OUTER JOIN users ON stock_location_history.user_uuid = users.user_uuid WHERE slh_uuid = $1;";
  const values = [slhUuid];

  const result = await executeQuery(query, values);

  return result;
};

export const getAllStockLocationHistory = async () => {
  const query =
    "SELECT stock_location_history.*, users.username FROM stock_location_history LEFT OUTER JOIN users ON stock_location_history.user_uuid = users.user_uuid ORDER BY date DESC;";
  const values = [];

  const result = await executeQuery(query, values);

  return result;
};

export const addStockLocationHistory = async (history) => {
  const keys = Object.keys(history);

  let query = "INSERT INTO stock_location_history ";
  const values = [];

  query += "(" + keys.join(", ") + ")";
  query += " VALUES ";

  let index = 1;
  query += "(" + keys.map((_) => `$${index++}`).join(", ") + ")";
  values.push(...Object.values(history));

  await executeQuery(query, values);
};

export const addStockLocationHistories = async (histories) => {
  const keys = Object.keys(histories[0]);

  let query = "INSERT INTO stock_location_history ";
  const values = [];

  query += "(" + keys.join(", ") + ")";
  query += " VALUES ";

  let index = 1;
  const insertStatements = [];

  for (let history of histories) {
    insertStatements.push(
      "(" + keys.map((_) => `$${index++}`).join(", ") + ")"
    );
    values.push(...Object.values(history));
  }

  query += insertStatements.join(", ");

  await executeQuery(query, values);
};

export const updateStockLocationHistory = async (history) => {
  const { slf_uuid: slhUuid, ...data } = history;
  const keys = Object.keys(data);

  let query = "UPDATE stock_location_history SET ";
  const values = [];

  let index = 1;
  query += keys.map((key) => `${key} = $${index++}`).join(", ");
  values.push(...Object.values(data));

  query += ` WHERE slh_uuid = $${index}`;
  values.push(slhUuid);

  await executeQuery(query, values);
};

export const deleteStockLocationHistory = async (history) => {
  const query = "DELETE FROM stock_location_history WHERE slh_uuid = $1";
  const values = [history.slh_uuid];

  await executeQuery(query, values);
};

export const deleteStockLocationHistories = async (histories) => {
  const query = "DELETE FROM stock_location_history WHERE slh_uuid IN ";
  const values = [];
  let index = 1;

  query += "(" + histories.map((_) => `$${index++}`).join(", ") + ")";
  values.push(...histories.map((history) => history.slh_uuid));

  await executeQuery(query, values);
};

export const queryStockLocationHistory = async (q) => {
  const { query, values } = queryBuilderHelper(q);

  const result = await executeQuery(query, values);

  return postProcessStocks(result);
};
