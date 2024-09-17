import { pool } from "../config/db.js";

export const getAllWarehouseLocations = async () => {
  const query = `SELECT * FROM warehouse_locations_view ORDER BY warehouse_location_id`;
  const values = [];

  const result = await pool.query(query, values);

  return result.rows;
};

export const getWarehouseLocation = async (warehouseLocationId) => {
  const query = `SELECT * FROM warehouse_locations_view WHERE warehouse_location_id = $1`;
  const values = [warehouseLocationId];

  const result = await pool.query(query, values);

  return result.rows;
};

export const addWarehouseLocation = async (warehouseLocation) => {
  const query = `INSERT INTO warehouse_locations (warehouse_location_id, status, created_by) 
                 SELECT $1, $2, users_view.id FROM users_view WHERE email = $3`;
  const values = [
    warehouseLocation.warehouse_location_id,
    warehouseLocation.status,
    warehouseLocation.email,
  ];

  await pool.query(query, values);
};

export const updateWarehouseLocation = async (warehouseLocation) => {
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

export const deleteWarehouseLocation = async (warehouseLocation) => {
  const query = `DELETE FROM warehouse_locations WHERE id = $1`;
  const values = [warehouseLocation.id];

  await pool.query(query, values);
};

export const deleteWarehouseLocations = async (warehouseLocations) => {
  const query = `DELETE FROM warehouse_locations WHERE id = ANY($1::INT[])`;
  const values = [
    warehouseLocations.map((warehouseLocation) => warehouseLocation.id),
  ];

  await pool.query(query, values);
};
