export const getWarehouseLocation = (warehouse_location_id) => {
  const query =
    "SELECT * FROM warehouse_locations WHERE warehouse_location_id = $1;";
  const values = [warehouse_location_id];

  return { query, values };
};

export const getAllWarehouseLocations = () => {
  const query =
    "SELECT * FROM warehouse_locations ORDER BY warehouse_location_id;";
  const values = [];

  return { query, values };
};

export const addWarehouseLocation = (warehouseLocation) => {
  const keys = Object.keys(warehouseLocation);

  let query = "INSERT INTO warehouse_locations (";
  const values = [];

  query += keys.join(", ");
  query += ") VALUES ";

  let index = 1;
  query += "(" + keys.map((_) => `$${index++}`).join(", ") + ")";
  values.push(...Object.values(warehouseLocation));

  query += " RETURNING *;";

  return { query, values };
};

export const addWarehouseLocations = (warehouseLocations) => {
  const keys = Object.keys(warehouseLocations[0]);

  let query = "INSERT INTO warehouse_locations (";
  const values = [];

  query += keys.join(", ");
  query += ") VALUES ";

  let index = 1;
  const insertStatements = [];

  for (let warehouseLocation of warehouseLocations) {
    insertStatements.push(
      "(" + keys.map((_) => `$${index++}`).join(", ") + ")"
    );
    for (let key of keys) {
      values.push(warehouseLocation[key]);
    }
  }

  query += insertStatements.join(", ");
  query += " RETURNING *;";

  return { query, values };
};

export const updateWarehouseLocation = (warehouseLocation) => {
  const keys = Object.keys(warehouseLocation);

  let query = "UPDATE warehouse_locations SET ";
  const values = [];

  let index = 1;
  query += keys.map((key) => `${key} = $${index++}`).join(", ");
  values.push(...Object.values(warehouseLocation));

  query += " WHERE warehouse_location_id = $1 RETURNING *;";
  values.push(warehouseLocation.warehouse_location_id);

  return { query, values };
};

export const deleteWarehouseLocation = (warehouseLocationId) => {
  const query =
    "DELETE FROM warehouse_locations WHERE warehouse_location_id = $1 RETURNING *;";
  const values = [warehouseLocationId];

  return { query, values };
};

export const deleteWarehouseLocations = (warehouseLocationIds) => {
  let index = 1;

  let query =
    "DELETE FROM warehouse_locations WHERE warehouse_location_id IN (";
  const values = [];

  query += warehouseLocationIds.map((_) => `$${index++}`).join(", ");
  values.push(...warehouseLocationIds);

  query += ") RETURNING *;";

  return { query, values };
};
