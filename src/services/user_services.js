export const getUserByEmail = (email) => {
  const query = "SELECT * FROM users WHERE email = $1;";
  const values = [email];

  return { query, values };
};

export const addNewUser = (user) => {
  const keys = Object.keys(user);
  const vals = Object.values(user);

  let query = "INSERT INTO users (";
  const values = [];
  let index = 1;

  query += keys.join(", ");
  query += ") VALUES (";
  query += keys.map((_) => `$${index++}`).join(", ");

  values.push(...vals);

  query += ") RETURNING *;";

  return { query, values };
};

export const updateUser = (userUUID, user) => {
  const keys = Object.keys(user);
  const vals = Object.values(user);

  let query = "UPDATE users SET ";
  const values = [];

  let index = 1;
  query += keys.map((key) => `${key} = $${index++}`).join(", ");
  values.push(...vals);

  query += ` WHERE user_uuid = $${index++} RETURNING *;`;
  values.push(userUUID);

  return { query, values };
};

export const deleteUser = (userUUID) => {
  const query = "DELETE FROM users WHERE user_uuid = $1 RETURNING *;";
  const values = [userUUID];

  return { query, values };
};
