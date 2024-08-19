export const getContainer = (containerId) => {
  const query = "SELECT * FROM containers WHERE container_id = $1;";
  const values = [containerId];

  return { query, values };
};

export const getAllContainers = () => {
  const query = "SELECT * FROM containers ORDER BY container_id;";
  const values = [];

  return { query, values };
};

export const addContainer = (container) => {
  const keys = Object.keys(container);

  let query = "INSERT INTO containers (";
  const values = [];

  query += keys.join(", ");
  query += ") VALUES ";

  let index = 1;
  query += "(" + keys.map((_) => `$${index++}`).join(", ") + ")";
  values.push(...Object.values(container));

  query += " RETURNING *;";

  return { query, values };
};

export const addContainers = (containers) => {
  const keys = Object.keys(containers[0]);

  let query = "INSERT INTO containers (";
  const values = [];

  query += keys.join(", ");
  query += ") VALUES ";

  let index = 1;
  const insertStatements = [];

  for (let container of containers) {
    insertStatements.push(
      "(" + keys.map((_) => `$${index++}`).join(", ") + ")"
    );
    for (let key of keys) {
      values.push(container[key]);
    }
  }

  query += insertStatements.join(", ");
  query += " RETURNING *;";

  return { query, values };
};

export const updateContainer = (container) => {
  const { container_id: containerId, ...data } = container;
  let keys = Object.keys(data);

  let query = "UPDATE containers SET ";
  const values = [];

  let index = 1;
  query += keys.map((key) => `${key} = $${index++}`).join(", ");
  values.push(...Object.values(data));

  query += ` WHERE container_id = $${index++} RETURNING *;`;
  values.push(containerId);

  return { query, values };
};

export const deleteContainer = (container) => {
  const query = "DELETE FROM containers WHERE container_id = $1 RETURNING *;";
  const values = [container.container_id];

  return { query, values };
};

export const deleteContainers = (containers) => {
  let index = 1;
  let query = "DELETE FROM containers WHERE container_id IN (";
  const values = [];

  query += containers.map((_) => `$${index++}`).join(", ");
  values.push(...containers.map((container) => container.container_id));

  query += ") RETURNING *;";

  return { query, values };
};
