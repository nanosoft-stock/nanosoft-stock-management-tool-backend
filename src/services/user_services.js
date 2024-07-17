export const getUserByEmail = async (executeQuery, email) => {
  const query = "SELECT * FROM users WHERE email = $1;";
  const values = [email];

  return await executeQuery(query, values);
};

export const addNewUser = async (executeQuery, email, username) => {
  const query =
    "INSERT INTO users (email, username) VALUES ($1, $2) RETURNING *;";
  const values = [email, username];

  return await executeQuery(query, values);
};

export const updateUser = async (executeQuery, email, body) => {
  const keys = Object.keys(body);
  const vals = Object.values(body);

  // * Email field is not allowed to be updated
  const i = keys.indexOf("email");
  if (i != -1) {
    keys.splice(i, 1);
    vals.splice(i, 1);
  }

  let query = "UPDATE users SET ";
  const values = [];

  let index = 1;
  query += keys.map((key) => `${key} = $${index++}`).join(", ");
  values.push(...vals);

  query += ` WHERE email = $${index++} RETURNING *;`;
  values.push(email);

  return await executeQuery(query, values);
};

export const deleteUser = async (executeQuery, email) => {
  const query = "DELETE FROM users WHERE email = $1 RETURNING *;";
  const values = [email];

  return await executeQuery(query, values);
};
