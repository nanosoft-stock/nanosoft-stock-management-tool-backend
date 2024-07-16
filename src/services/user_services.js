import { query } from "../config/db.js";

export const createNewUser = async (email, username) => {
  const result = await query(
    "INSERT INTO users (email, username) VALUES ($1, $2) RETURNING *;",
    [email, username]
  );

  return result.rows;
};

export const getUserByEmail = async (email) => {
  const result = await query("SELECT * FROM users WHERE email = $1 LIMIT 1;", [
    email,
  ]);

  return result.rows;
};

export const updateUser = async (email, body) => {
  const keys = Object.keys(body);
  const values = Object.values(body);

  const i = keys.indexOf("email");
  if (i != -1) {
    keys.splice(i, 1);
    values.splice(i, 1);
  }

  let index = 1;
  const setClause = keys.map((key) => `${key} = $${index++}`).join(", ");

  const result = await query(
    `UPDATE users SET ${setClause} WHERE email = $${index++} RETURNING *;`,
    [...values, email]
  );

  return result.rows;
};

export const deleteUser = async (email) => {
  const result = await query(
    `DELETE FROM users WHERE email = $1 RETURNING *;`,
    [email]
  );

  return result.rows;
};
