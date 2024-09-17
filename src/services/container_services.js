import { pool } from "../config/db.js";

export const getAllContainers = async () => {
  const query = `SELECT * FROM containers_view ORDER BY container_id`;
  const values = [];

  const result = await pool.query(query, values);

  return result.rows;
};

export const getContainer = async (containerId) => {
  const query = `SELECT * FROM containers_view WHERE container_id = $1`;
  const values = [containerId];

  const result = await pool.query(query, values);

  return result.rows;
};

export const addContainer = async (container) => {
  const query = `INSERT INTO containers (container_id, warehouse_location_fid, status, created_by)
                 SELECT $1, warehouse_locations_view.id, $2, users_view.id FROM users_view 
                 LEFT JOIN warehouse_locations_view ON warehouse_locations_view.warehouse_location_id = $3
                 WHERE email = $4`;
  const values = [
    container.container_id,
    container.status,
    container.warehouse_location_id,
    container.email,
  ];

  await pool.query(query, values);
};

export const updateContainer = async (container) => {
  const query = `UPDATE containers SET 
                 container_id = COALESCE($1, container_id),
                 warehouse_location_fid = COALESCE((SELECT id FROM warehouse_locations_view WHERE warehouse_location_id = $2), warehouse_location_fid),
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

export const deleteContainer = async (container) => {
  const query = `DELETE FROM containers WHERE id = $1`;
  const values = [container.id];

  await pool.query(query, values);
};

export const deleteContainers = async (containers) => {
  const query = `DELETE FROM containers WHERE id = ANY($1::INT[])`;
  const values = [containers.map((container) => container.id)];

  await pool.query(query, values);
};

export const generateNewContainers = async (count, email) => {
  const query = `SELECT * FROM fn_generate_container_ids($1, $2)`;
  const values = [count, email];

  const result = await pool.query(query, values);

  return result.rows;
};

export const deleteGeneratedContainers = async (start, end) => {
  const query = `SELECT * FROM fn_delete_container_ids($1, $2)`;
  const values = [start, end];

  const result = await pool.query(query, values);

  return result.rows;
};
