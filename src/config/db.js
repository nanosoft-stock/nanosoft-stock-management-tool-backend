import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

export const executeQuery = async (query, values) => {
  try {
    pool.query("BEGIN;");
    const result = await pool.query(query, values);
    pool.query("COMMIT;");
    return result.rows;
  } catch (error) {
    pool.query("ROLLBACK;");
    throw error;
  }
};
