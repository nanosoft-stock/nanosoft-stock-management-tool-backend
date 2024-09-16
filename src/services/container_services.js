import { pool } from "../config/db.js";

export const getAllContainers = async () => {
  const query = "SELECT * FROM containers_view ORDER BY container_id";
  const values = [];

  const result = await pool.query(query, values);

  return result.rows;
};

export const getContainer = async (containerId) => {
  const query = "SELECT * FROM containers_view WHERE container_id = $1";
  const values = [containerId];

  const result = await pool.query(query, values);

  return result.rows;
};

export const addContainer = async (container) => {
  let query = `INSERT INTO containers (container_id, warehouse_location_fid, status, created_by)
               SELECT $1, warehouse_locations.id, $2, users.id FROM users 
               LEFT JOIN warehouse_locations ON warehouse_locations.warehouse_location_id = $3
               WHERE users.email = $4`;
  const values = [
    container.container_id,
    container.status,
    container.warehouse_location_id,
    container.email,
  ];

  await pool.query(query, values);
};

export const updateContainer = async (id, container) => {
  let keys = Object.keys(container);

  let query = "UPDATE containers SET ";
  const values = [];

  if (container.container_id) {}thanks 

  let index = 1;
  query += keys.map((key) => `${key} = $${index++}`).join(", ");
  values.push(...Object.values(container));

  query += ` WHERE id = $${index++}`;
  values.push(id);

  await pool.query(query, values);
};

export const deleteContainer = async (container) => {
  const query = "DELETE FROM containers WHERE id = $1";
  const values = [container.id];

  await pool.query(query, values);
};

export const deleteContainers = async (containers) => {
  let query = "DELETE FROM containers WHERE id IN ";
  const values = [];
  let index = 1;

  query += "(" + containers.map((_) => `$${index++}`).join(", ") + ")";
  values.push(...containers.map((container) => container.id));

  await pool.query(query, values);
};

export const generateNewContainers = async (count) => {
  let query = "SELECT fn_generate_container_ids($1)";
  const values = [count];

  const result = await pool.query(query, values);

  return result.rows;
};

export const deleteGeneratedContainers = async (start, end) => {
  let query = "SELECT fn_delete_container_ids($1, $2)";
  const values = [start, end];

  const result = await pool.query(query, values);

  return result.rows;
};
