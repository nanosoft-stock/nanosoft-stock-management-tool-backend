import { executeQuery } from "../config/db.js";

export const getAllFields = async () => {
  const query = "SELECT * FROM fields ORDER BY display_order";
  const values = [];

  const result = await executeQuery(query, values);

  return result;
};

export const getCategoryFields = async (category) => {
  const query =
    "SELECT * FROM fields WHERE category = $1 ORDER BY display_order";
  const values = [category];

  const result = await executeQuery(query, values);

  return result;
};

export const addFields = async (fields) => {
  const keys = Object.keys(fields[0]);

  let query = "INSERT INTO fields ";
  const values = [];

  query += "(" + keys.join(", ") + ")";
  query += " VALUES ";

  let index = 1;
  const insertStatements = [];

  for (let field of fields) {
    insertStatements.push(
      "(" + keys.map((_) => `$${index++}`).join(", ") + ")"
    );
    values.push(...Object.values(field));
  }

  query += insertStatements.join(", ");

  await executeQuery(query, values);
};

export const updateField = async (field) => {
  const { field_uuid: fieldUUID, ...data } = field;
  let keys = Object.keys(field);

  let query = "UPDATE fields SET ";
  const values = [];

  let index = 1;
  query += keys.map((key) => `${key} = $${index++}`).join(", ");
  values.push(...Object.values(data));

  query += ` WHERE field_uuid = $${index++}`;
  values.push(fieldUUID);

  await executeQuery(query, values);
};

export const deleteFields = async (fields) => {
  let query = "DELETE FROM fields WHERE field_uuid IN";
  const values = [];
  let index = 1;

  query += "(" + fields.map((_) => `$${index++}`).join(", ") + ")";
  values.push(...fields.map((field) => field.field_uuid));

  await executeQuery(query, values);
};
