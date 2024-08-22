import { executeQuery } from "../config/db.js";

export const getContainer = async (containerId) => {
  const query = "SELECT * FROM containers WHERE container_id = $1";
  const values = [containerId];

  const result = await executeQuery(query, values);

  return result;
};

export const getAllContainers = async () => {
  const query = "SELECT * FROM containers ORDER BY container_id";
  const values = [];

  const result = await executeQuery(query, values);

  return result;
};

export const addContainer = async (container) => {
  const keys = Object.keys(container);

  let query = "INSERT INTO containers ";
  const values = [];

  query += "(" + keys.join(", ") + ")";
  query += " VALUES ";

  let index = 1;
  query += "(" + keys.map((_) => `$${index++}`).join(", ") + ")";
  values.push(...Object.values(container));

  await executeQuery(query, values);
};

export const addContainers = async (containers) => {
  const keys = Object.keys(containers[0]);

  let query = "INSERT INTO containers ";
  const values = [];

  query += "(" + keys.join(", ") + ")";
  query += " VALUES ";

  let index = 1;
  const insertStatements = [];

  for (let container of containers) {
    insertStatements.push(
      "(" + keys.map((_) => `$${index++}`).join(", ") + ")"
    );
    values.push(...Object.values(container));
  }

  query += insertStatements.join(", ");

  await executeQuery(query, values);
};

export const updateContainer = async (container) => {
  const { container_id: containerId, ...data } = container;
  let keys = Object.keys(data);

  let query = "UPDATE containers SET ";
  const values = [];

  let index = 1;
  query += keys.map((key) => `${key} = $${index++}`).join(", ");
  values.push(...Object.values(data));

  query += ` WHERE container_id = $${index++}`;
  values.push(containerId);

  await executeQuery(query, values);
};

export const deleteContainer = async (container) => {
  const query = "DELETE FROM containers WHERE container_id = $1";
  const values = [container.container_id];

  await executeQuery(query, values);
};

export const deleteContainers = async (containers) => {
  let query = "DELETE FROM containers WHERE container_id IN ";
  const values = [];
  let index = 1;

  query += "(" + containers.map((_) => `$${index++}`).join(", ") + ")";
  values.push(...containers.map((container) => container.container_id));

  await executeQuery(query, values);
};
