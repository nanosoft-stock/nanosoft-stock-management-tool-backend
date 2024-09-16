import { pool } from "../config/db.js";

export const getAllWarehouseLocations = async () => {
  const query =
    "SELECT * FROM warehouse_locations_view ORDER BY warehouse_location_id";
  const values = [];

  const result = await pool.query(query, values);

  return result.rows;
};

export const getWarehouseLocation = async (warehouseLocationId) => {
  const query =
    "SELECT * FROM warehouse_locations_view WHERE warehouse_location_id = $1";
  const values = [warehouseLocationId];

  const result = await pool.query(query, values);

  return result.rows;
};

export const addWarehouseLocation = async (warehouseLocation) => {
  let query = `INSERT INTO warehouse_locations (warehouse_location_id, status, created_by) 
               SELECT $1, $2, users.id FROM users WHERE email = $3`;
  const values = [
    warehouseLocation.warehouse_location_id,
    warehouseLocation.status,
    warehouseLocation.email,
  ];

  await pool.query(query, values);
};

export const updateWarehouseLocation = async (id, warehouseLocation) => {
  const keys = Object.keys(warehouseLocation);

  let query = "UPDATE warehouse_locations SET ";
  const values = [];

  let index = 1;
  query += keys.map((key) => `${key} = $${index++}`).join(", ");
  values.push(...Object.values(warehouseLocation));

  query += ` WHERE id = $${index++}`;
  values.push(id);

  await pool.query(query, values);
};

export const deleteWarehouseLocation = async (warehouseLocation) => {
  const query = "DELETE FROM warehouse_locations WHERE id = $1";
  const values = [warehouseLocation.id];

  await pool.query(query, values);
};

export const deleteWarehouseLocations = async (warehouseLocations) => {
  let query = "DELETE FROM warehouse_locations WHERE id IN ";
  const values = [];
  let index = 1;

  query += "(" + warehouseLocations.map((_) => `$${index++}`).join(", ") + ")";
  values.push(...warehouseLocations.map((location) => location.id));

  await pool.query(query, values);
};
