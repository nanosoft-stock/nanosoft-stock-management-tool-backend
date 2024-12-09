import { QueryResult } from "pg";
import { pool } from "../config/db.js";
import { queryBuilderHelper } from "../helpers/query_builder_helper.js";

export const getAllWarehouseLocations = async (): Promise<any[]> => {
  const query = `SELECT * FROM warehouse_locations_view ORDER BY warehouse_location_id`;
  const values = [];

  const result: QueryResult = await pool.query(query, values);

  return result.rows;
};

export const addWarehouseLocation = async (
  warehouseLocation,
): Promise<void> => {
  const query = `INSERT INTO warehouse_locations (warehouse_location_id, status, created_by) 
                 VALUES ($1, $2, $3)`;
  const values = [
    warehouseLocation.warehouse_location_id,
    warehouseLocation.status,
    warehouseLocation.user_id,
  ];

  await pool.query(query, values);
};

export const updateWarehouseLocation = async (
  warehouseLocation,
): Promise<void> => {
  const query = `UPDATE warehouse_locations SET 
                 warehouse_location_id = COALESCE($1, warehouse_location_id), 
                 status = COALESCE($2, status) 
                 WHERE id = $3`;
  const values = [
    warehouseLocation.warehouse_location_id,
    warehouseLocation.status,
    warehouseLocation.id,
  ];

  await pool.query(query, values);
};

export const deleteWarehouseLocation = async (
  warehouseLocation,
): Promise<void> => {
  const query = `DELETE FROM warehouse_locations WHERE id = $1`;
  const values = [warehouseLocation.id];

  await pool.query(query, values);
};

export const deleteWarehouseLocations = async (
  warehouseLocations,
): Promise<void> => {
  const query = `DELETE FROM warehouse_locations WHERE id = ANY($1::INT[])`;
  const values = [
    warehouseLocations.map((warehouseLocation) => warehouseLocation.id),
  ];

  await pool.query(query, values);
};

export const queryWarehouseLocations = async (q): Promise<any[]> => {
  q["from"] = "warehouse_locations_view";

  const { query, values } = queryBuilderHelper(q);
  const result: QueryResult = await pool.query(query, values);

  return result.rows;
};
