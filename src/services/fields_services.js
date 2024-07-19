export const getAllFields = () => {
  const query = "SELECT * FROM fields ORDER BY display_order;";
  const values = [];

  return { query, values };
};

export const getCategoryFields = (categoryUUID) => {
  const query =
    "SELECT * FROM fields WHERE category_uuid = $1 ORDER BY display_order;";
  const values = [categoryUUID];

  return { query, values };
};

export const addFields = (fields) => {
  const keys = Object.keys(fields[0]);

  let query = "INSERT INTO fields (";
  const values = [];

  query += keys.join(", ");

  query += ") VALUES ";

  let index = 1;
  const insertStatements = [];

  for (let entry of fields) {
    insertStatements.push(
      "(" + keys.map((_) => `$${index++}`).join(", ") + ")"
    );
    for (let key of keys) {
      values.push(entry[key]);
    }
  }

  query += insertStatements.join(", ");

  query += " RETURNING *;";

  return { query, values };
};

export const updateField = (fieldUUID, data) => {
  let keys = Object.keys(data);

  let query = "UPDATE fields SET ";
  const values = [];

  let index = 1;
  query += keys.map((key) => `${key} = $${index++}`).join(", ");
  values.push(...Object.values(data));

  query += ` WHERE field_uuid = $${index++} RETURNING *;`;
  values.push(fieldUUID);

  return { query, values };
};

export const deleteFields = (ids) => {
  let query = "DELETE FROM fields WHERE field_uuid IN $1 RETURNING *;";
  const values = [ids];

  return { query, values };
};
