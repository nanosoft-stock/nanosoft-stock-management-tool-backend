import { pool } from "../config/db.js";

export const getUserByEmail = async (email) => {
  const query = "SELECT * FROM users_view WHERE email = $1";
  const values = [email];

  const result = await pool.query(query, values);

  return result.rows;
};

export const addNewUser = async (user) => {
  const query = "INSERT INTO users (email, username) VALUES ($1, $2)";
  const values = [user.email, user.username];

  await pool.query(query, values);
};

export const updateUser = async (id, user) => {
  const entries = Object.entries(user);

  let index = 1;
  let query = "UPDATE users SET ";
  const values = [];

  query += entries
    .map(([key, value]) => {
      values.push(value);

      return `${key} = $${index++}`;
    })
    .join(", ");

  query += ` WHERE id = $${index}`;
  values.push(id);

  await pool.query(query, values);
};

export const deleteUser = async (id) => {
  const query = "DELETE FROM users WHERE id = $1";
  const values = [id];

  await pool.query(query, values);
};
