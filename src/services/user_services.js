import { executeQuery } from "../config/db.js";

export const getUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];

  const result = await executeQuery(query, values);

  return result;
};

export const addNewUser = async (user) => {
  const keys = Object.keys(user);
  const vals = Object.values(user);

  let query = "INSERT INTO users ";
  const values = [];
  let index = 1;

  query += "(" + keys.join(", ") + ")";
  query += " VALUES ";

  query += "(" + keys.map((_) => `$${index++}`).join(", ") + ")";
  values.push(...vals);

  await executeQuery(query, values);
};

export const updateUser = async (userUUID, user) => {
  const keys = Object.keys(user);
  const vals = Object.values(user);

  let query = "UPDATE users SET ";
  const values = [];

  let index = 1;
  query += keys.map((key) => `${key} = $${index++}`).join(", ");
  values.push(...vals);

  query += ` WHERE user_uuid = $${index++}`;
  values.push(userUUID);

  await executeQuery(query, values);
};

export const deleteUser = async (userUUID) => {
  const query = "DELETE FROM users WHERE user_uuid = $1";
  const values = [userUUID];

  await executeQuery(query, values);
};
