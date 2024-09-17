import { pool } from "../config/db.js";

export const getUserByEmail = async (email) => {
  const query = `SELECT * FROM users_view WHERE email = $1`;
  const values = [email];

  const result = await pool.query(query, values);

  return result.rows;
};

export const addNewUser = async (user) => {
  const query = `INSERT INTO users (email, username) VALUES ($1, $2)`;
  const values = [user.email, user.username];

  await pool.query(query, values);
};

export const updateUser = async (user) => {
  const query = `UPDATE users SET 
                 email = COALESCE($1, email), 
                 username = ($2, username) 
                 WHERE id = $3`;
  const values = [user.email, user.username, user.id];

  await pool.query(query, values);
};

export const deleteUser = async (user) => {
  const query = `DELETE FROM users WHERE id = $1`;
  const values = [user.id];

  await pool.query(query, values);
};
