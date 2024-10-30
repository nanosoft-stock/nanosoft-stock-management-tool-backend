import { QueryResult } from "pg";
import { pool } from "../config/db.js";
import { queryBuilderHelper } from "../helpers/query_builder_helper.js";

export const getAllStockLocationHistory = async (): Promise<any[]> => {
  const query = `SELECT * FROM stock_location_history_view ORDER BY date DESC`;
  const values = [];

  const result: QueryResult = await pool.query(query, values);

  return result.rows;
};

export const getStockLocationHistory = async (id: string): Promise<any[]> => {
  const query = `SELECT * FROM stock_location_history_view WHERE id = $1`;
  const values = [id];

  const result: QueryResult = await pool.query(query, values);

  return result.rows;
};

export const addStockLocationHistory = async (history): Promise<void> => {
  const query = `INSERT INTO stock_location_history 
                 (group_uuid, items, container_fid, warehouse_location_fid, move_type, status, user_fid) 
                 SELECT $1, $2, containers.id, warehouse_locations.id, $3, $4, $5 
                 FROM containers 
                 LEFT JOIN warehouse_locations ON warehouse_locations.warehouse_location_id = $6 
                 WHERE containers.container_id = $7`;
  const values = [
    history.group_uuid,
    history.items,
    history.move_type,
    history.status,
    history.user_id,
    history.warehouse_location_id,
    history.container_id,
  ];

  await pool.query(query, values);
};

export const updateStockLocationHistory = async (history): Promise<void> => {
  const query = `UPDATE stock_location_history SET 
                 group_uuid = COALESCE($1, group_uuid), 
                 items = COALESCE($2, items), 
                 container_fid = COALESCE((SELECT id FROM containers WHERE container_id = $3), container_fid), 
                 warehouse_location_fid = COALESCE((SELECT id FROM warehouse_locations WHERE warehouse_location_id = $4), warehouse_location_fid), 
                 move_type = COALESCE($5, move_type), 
                 status = COALESCE($6, status) 
                 WHERE id = $7`;
  const values = [
    history.group_uuid,
    history.items,
    history.container_id,
    history.warehouse_location_id,
    history.move_type,
    history.status,
    history.id,
  ];

  await pool.query(query, values);
};

export const deleteStockLocationHistory = async (history): Promise<void> => {
  const query = `DELETE FROM stock_location_history WHERE id = $1`;
  const values = [history.id];

  await pool.query(query, values);
};

export const deleteStockLocationHistories = async (
  histories,
): Promise<void> => {
  const query = `DELETE FROM stock_location_history WHERE id = ANY($1::INT[])`;
  const values = [histories.map((history) => history.id)];

  await pool.query(query, values);
};

export const queryStockLocationHistory = async (q): Promise<any[]> => {
  q["from"] = "stock_location_history_view";

  const { query, values } = queryBuilderHelper(q);

  const result: QueryResult = await pool.query(query, values);

  return result.rows;
};
