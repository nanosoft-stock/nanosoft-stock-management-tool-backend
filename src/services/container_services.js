export const getAllContainers = () => {
  const query = "SELECT * FROM containers ORDER BY container_id;";
  const values = [];

  return { query, values };
};

export const addNewContainer = (containerId, status) => {
  const query =
    "INSERT INTO containers (container_id, status) VALUES ($1, $2) RETURNING *;";
  const values = [containerId, status];

  return { query, values };
};

export const addNewContainers = (body) => {
  let query = "INSERT INTO containers (container_id, status) VALUES ";
  const values = [];

  let index = 1;
  query += body
    .map((entry) => {
      values.push(entry.container_id, entry.status);
      return `($${index++}, $${index++})`;
    })
    .join(", ");

  query += " RETURNING *;";

  return { query, values };
};

export const updateContainer = (containerId, status) => {
  const query =
    "UPDATE containers SET status = $1 WHERE container_id = $2 RETURNING *;";
  const values = [status, containerId];

  return { query, values };
};
