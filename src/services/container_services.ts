import { QueryResult } from "pg";
import { pool } from "../config/db.js";

export const getAllContainers = async (): Promise<any[]> => {
  const query = `SELECT * FROM containers_view ORDER BY container_id`;
  const values = [];

  const result: QueryResult = await pool.query(query, values);

  return result.rows;
};

export const getContainer = async (containerId: string): Promise<any[]> => {
  const query = `SELECT * FROM containers_view WHERE container_id = $1`;
  const values = [containerId];

  const result: QueryResult = await pool.query(query, values);

  return result.rows;
};

export const addContainer = async (container): Promise<void> => {
  const query = `INSERT INTO containers (container_id, warehouse_location_fid, status, created_by) 
                 SELECT $1, warehouse_locations.id, $2, $3 FROM warehouse_locations 
                 WHERE warehouse_location_id = $4`;
  const values = [
    container.container_id,
    container.status,
    container.user_id,
    container.warehouse_location_id,
  ];

  await pool.query(query, values);
};

export const updateContainer = async (container): Promise<void> => {
  const query = `UPDATE containers SET 
                 container_id = COALESCE($1, container_id),
                 warehouse_location_fid = COALESCE((SELECT id FROM warehouse_locations WHERE warehouse_location_id = $2), warehouse_location_fid),
                 status = COALESCE($3, status) 
                 WHERE id = $4`;
  const values = [
    container.container_id,
    container.warehouse_location_id,
    container.status,
    container.id,
  ];

  await pool.query(query, values);
};

export const deleteContainer = async (container): Promise<void> => {
  const query = `DELETE FROM containers WHERE id = $1`;
  const values = [container.id];

  await pool.query(query, values);
};

export const deleteContainers = async (containers): Promise<void> => {
  const query = `DELETE FROM containers WHERE id = ANY($1::INT[])`;
  const values = [containers.map((container) => container.id)];

  await pool.query(query, values);
};

export const generateNewContainers = async (
  count: number,
  user_id: number,
): Promise<any[]> => {
  const query = `SELECT * FROM fn_generate_container_ids($1, $2)`;
  const values = [count, user_id];

  const result: QueryResult = await pool.query(query, values);

  return result.rows;
};

export const deleteGeneratedContainers = async (
  start: string,
  end: string,
): Promise<void> => {
  const query = `SELECT * FROM fn_delete_container_ids($1, $2)`;
  const values = [start, end];

  await pool.query(query, values);
};
