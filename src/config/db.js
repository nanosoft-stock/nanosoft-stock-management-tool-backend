import pg from "pg";
import dotenv from "dotenv";
import { io } from "../server.js";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

const notificationHandler = (message) => {
  const payload = JSON.parse(message.payload);

  io.emit("database", payload);
};

pool.connect(async (error, client, done) => {
  if (error) {
    console.error("Error connecting to the database:", error);
  } else {
    console.log(`Connected to the ${process.env.DB_NAME} database`);

    client.on("notification", notificationHandler);
    client.query("LISTEN table_update");
  }
});

export const executeQuery = async (query, values) => {
  try {
    pool.query("BEGIN");

    const result = await pool.query(query, values);

    pool.query("COMMIT");
    
    return result.rows;
  } catch (error) {
    pool.query("ROLLBACK");
    throw error;
  }
};
