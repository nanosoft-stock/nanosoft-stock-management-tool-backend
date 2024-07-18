export const getUserByEmail = (email) => {
  const query = "SELECT * FROM users WHERE email = $1;";
  const values = [email];

  return { query, values };
};

export const addNewUser = (email, username) => {
  const query =
    "INSERT INTO users (email, username) VALUES ($1, $2) RETURNING *;";
  const values = [email, username];

  return { query, values };
};

export const updateUser = (userUUID, body) => {
  const keys = Object.keys(body);
  const vals = Object.values(body);

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
