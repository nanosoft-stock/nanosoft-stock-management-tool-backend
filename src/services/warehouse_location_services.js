export const getAllWarehouseLocations = () => {
  const query = "SELECT * FROM warehouse_locations ORDER BY warehouse_location_id;";
  const values = [];

  return { query, values };
};

export const addNewWarehouseLocation = (warehouseLocationId) => {
  const query =
    "INSERT INTO warehouse_locations (warehouse_location_id) VALUES ($1) RETURNING *;";
  const values = [warehouseLocationId];

  return { query, values };
};

export const addNewWarehouseLocations = (body) => {
  let query = "INSERT INTO warehouse_locations (warehouse_location_id) VALUES ";
  const values = [];

  let index = 1;
  query += body
    .map((entry) => {
      values.push(entry.warehouse_location_id);
      return `($${index++})`;
    })
    .join(", ");

  query += " RETURNING *;";

  return { query, values };
};
