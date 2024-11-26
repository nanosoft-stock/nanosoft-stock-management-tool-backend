import { QueryResult } from "pg";
import { pool } from "../config/db.js";

export const getUserPreference = async (
  userId: string | number,
): Promise<void> => {
  const query = `SELECT * from user_preferences WHERE user_fid = $1`;
  const values = [userId];

  await pool.query(query, values);
};

export const addUserPreference = async (preference): Promise<void> => {
  const query = `INSERT INTO user_preferences (user_fid, current_user_table_preference_fid) VALUES ($1, $2)`;
  const values = [
    preference.user_id,
    preference.current_user_table_preference_fid,
  ];

  await pool.query(query, values);
};

export const updateUserPreference = async (preference): Promise<void> => {
  const query = `UPDATE user_preferences SET 
                 current_user_table_preference_fid = $1 
                 WHERE user_fid = $2`;
  const values = [
    preference.current_user_table_preference_fid,
    preference.userId,
  ];

  await pool.query(query, values);
};

export const deleteUserPreference = async (preference): Promise<void> => {
  const query = `DELETE FROM user_preferences where user_fid = $1`;
  const values = [preference.userId];

  await pool.query(query, values);
};

export const getUserTablePreference = async (
  id: string | number,
  userId: string | number,
): Promise<any[]> => {
  const query = `SELECT * FROM user_table_preferences_view WHERE id = $1`;
  const values = [id];

  const result: QueryResult = await pool.query(query, values);

  const query2 = `UPDATE user_preferences SET 
                  current_user_table_preference_fid = $1 
                  WHERE user_fid = $2`;
  const values2 = [id, userId];

  await pool.query(query2, values2);

  return result.rows;
};

export const getAllUserTablePreferences = async (
  userId: string | number,
): Promise<any[]> => {
  const query = `SELECT * FROM user_table_preferences_view WHERE user_id = $1`;
  const values = [userId];

  const result: QueryResult = await pool.query(query, values);

  return result.rows;
};

export const getUserCurrentTablePreference = async (
  userId: string | number,
): Promise<any[]> => {
  const query = `SELECT * FROM user_table_preferences_view 
                 INNER JOIN user_preferences ON user_preferences.user_fid = user_table_preferences_view.user_id
                 WHERE user_table_preferences_view.id = user_preferences.current_user_table_preference_fid AND user_table_preferences_view.user_id = $1`;
  const values = [userId];

  const result: QueryResult = await pool.query(query, values);

  return result.rows;
};

export const addUserTablePreference = async (preference): Promise<void> => {
  const query = `INSERT INTO user_table_preferences 
                 (user_fid, table_preference_name, columns) 
                 VALUES ($1, $2, $3) RETURNING *`;
  const values = [
    preference.user_id,
    preference.table_preference_name,
    preference.columns,
  ];

  const result: QueryResult = await pool.query(query, values);
  const id = result.rows[0].id;

  const query2 = `UPDATE user_preferences SET 
                  current_user_table_preference_fid = $1 
                  WHERE user_fid = $2`;
  const values2 = [id, preference.user_id];

  await pool.query(query2, values2);
};

export const updateUserTablePreference = async (preference): Promise<void> => {
  const query = `UPDATE user_table_preferences SET 
                 table_preference_name = COALESCE($1, table_preference_name), 
                 columns = COALESCE($2, columns) 
                 WHERE id = $3`;
  const values = [
    preference.table_preference_name,
    preference.columns,
    preference.id,
  ];

  await pool.query(query, values);

  const query2 = `UPDATE user_preferences SET 
                  current_user_table_preference_fid = $1 
                  WHERE user_fid = $2`;
  const values2 = [preference.id, preference.user_id];

  await pool.query(query2, values2);
};

export const deleteUserTablePreference = async (preference): Promise<void> => {
  const query = `DELETE FROM user_table_preferences WHERE id = $1`;
  const values = [preference.id];

  await pool.query(query, values);

  const query2 = `SELECT * FROM user_table_preferences_view WHERE user_id = $1`;
  const values2 = [preference.user_id];

  const result2: QueryResult = await pool.query(query2, values2);

  const query3 = `UPDATE user_preferences SET 
                  current_user_table_preference_fid = $1 
                  WHERE user_fid = $2`;
  const values3 = [result2.rows[0].id, preference.user_id];

  await pool.query(query3, values3);
};
