import { executeQuery } from "../config/db.js";

export const getWarehouseLocation = async (warehouse_location_id) => {
  const query =
    "SELECT * FROM warehouse_locations WHERE warehouse_location_id = $1";
  const values = [warehouse_location_id];

  const result = await executeQuery(query, values);

  return result;
};

export const getAllWarehouseLocations = async () => {
  const query =
    "SELECT * FROM warehouse_locations ORDER BY warehouse_location_id";
  const values = [];

  const result = await executeQuery(query, values);

  return result;
};

export const addWarehouseLocation = async (warehouseLocation) => {
  const keys = Object.keys(warehouseLocation);

  let query = "INSERT INTO warehouse_locations ";
  const values = [];

  query += "(" + keys.join(", ") + ")";
  query += " VALUES ";

  let index = 1;
  query += "(" + keys.map((_) => `$${index++}`).join(", ") + ")";
  values.push(...Object.values(warehouseLocation));

  await executeQuery(query, values);
};

export const addWarehouseLocations = async (warehouseLocations) => {
  const keys = Object.keys(warehouseLocations[0]);

  let query = "INSERT INTO warehouse_locations ";
  const values = [];

  query += "(" + keys.join(", ") + ")";
  query += " VALUES ";

  let index = 1;
  const insertStatements = [];

  for (let warehouseLocation of warehouseLocations) {
    insertStatements.push(
      "(" + keys.map((_) => `$${index++}`).join(", ") + ")"
    );
    values.push(...Object.values(warehouseLocation));
  }

  query += insertStatements.join(", ");

  await executeQuery(query, values);
};

export const updateWarehouseLocation = async (warehouseLocation) => {
  const keys = Object.keys(warehouseLocation);

  let query = "UPDATE warehouse_locations SET ";
  const values = [];

  let index = 1;
  query += keys.map((key) => `${key} = $${index++}`).join(", ");
  values.push(...Object.values(warehouseLocation));

  query += ` WHERE warehouse_location_id = $${index++}`;
  values.push(warehouseLocation.warehouse_location_id);

  await executeQuery(query, values);
};

export const deleteWarehouseLocation = async (warehouseLocation) => {
  const query =
    "DELETE FROM warehouse_locations WHERE warehouse_location_id = $1";
  const values = [warehouseLocation.warehouse_location_id];

  await executeQuery(query, values);
};

export const deleteWarehouseLocations = async (warehouseLocations) => {
  let query = "DELETE FROM warehouse_locations WHERE warehouse_location_id IN ";
  const values = [];
  let index = 1;

  query += "(" + warehouseLocations.map((_) => `$${index++}`).join(", ") + ")";
  values.push(
    ...warehouseLocations.map((location) => location.warehouse_location_id)
  );

  await executeQuery(query, values);
};
