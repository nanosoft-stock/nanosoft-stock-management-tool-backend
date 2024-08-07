import pg from "pg";
import dotenv from "dotenv";
import { io } from "../server.js";

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

const notificationHandler = (message) => {
  const payload = JSON.parse(message.payload);
  console.log("payload", payload);

  io.emit("database", payload);
};

pool.connect(async (error, client, done) => {
  if (error) {
    console.error("Error connecting to the database:", error);
  } else {
    console.log(`Connected to the ${process.env.DB_NAME} database`);

    await createDataChangeTriggers();

    client.on("notification", notificationHandler);
    client.query("LISTEN table_update;");
  }
});

export const executeQuery = async (query, values) => {
  try {
    pool.query("BEGIN;");
    const result = await pool.query(query, values);
    pool.query("COMMIT;");
    return result.rows;
  } catch (error) {
    console.log(error);
    pool.query("ROLLBACK;");
    throw error;
  }
};

const createDataChangeTriggers = async () => {
  const allTables = await executeQuery(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';"
  );

  for (const { table_name } of allTables) {
    const createFunction = `CREATE OR REPLACE FUNCTION ${table_name}_notify_event() RETURNS trigger AS $$
    DECLARE
        payload JSON;
    BEGIN
        IF TG_OP = 'DELETE' THEN
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(OLD)
            );
        ELSE
            payload = json_build_object(
                'table', TG_TABLE_NAME,
                'operation', TG_OP,
                'data', row_to_json(NEW)
            );
        END IF;
        PERFORM pg_notify(CAST('table_update' AS TEXT), payload::TEXT);

        RETURN NEW;
    END
    $$ LANGUAGE plpgsql;`;

    await executeQuery(createFunction);

    const createTrigger = `CREATE OR REPLACE TRIGGER ${table_name}_update_trigger
        AFTER INSERT OR UPDATE OR DELETE
        ON ${table_name}
        FOR EACH ROW
        EXECUTE PROCEDURE ${table_name}_notify_event();`;

    await executeQuery(createTrigger);
  }
};
