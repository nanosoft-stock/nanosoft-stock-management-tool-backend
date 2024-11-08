import pg from "pg";
import * as dotenv from "dotenv";
import "reflect-metadata";
import { io } from "../server.js";

dotenv.config();

export const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  //ssl: {
  //  rejectUnauthorized: false,
  //},
});

pool.connect(async (error, client) => {
  if (error) {
    console.error("Error connecting to the database:", error);
  } else {
    console.log(`Connected to the ${process.env.DB_NAME} database`);

    client.on("notification", notificationHandler);
    client.query("LISTEN table_update");
  }
});

const notificationHandler = (message) => {
  const payload = JSON.parse(message.payload);

  io.emit("database", payload);
};

//export const executeQuery = async (query, values) => {
//  try {
//    pool.query("BEGIN");
//
//    const result = await pool.query(query, values);
//
//    pool.query("COMMIT");
//
//    return result.rows;
//  } catch (error) {
//    pool.query("ROLLBACK");
//    throw error;
//  }
//};
