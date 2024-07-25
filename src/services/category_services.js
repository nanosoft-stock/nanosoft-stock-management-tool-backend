export const getAllCategories = () => {
  const query = "SELECT * FROM categories ORDER BY category;";
  const values = [];

  return { query, values };
};

export const getCategory = (category) => {
  const query = "SELECT * FROM categories WHERE category = $1;";
  const values = [category];

  return { query, values };
};

export const addNewCategory = (category) => {
  const query = "INSERT INTO categories (category) VALUES ($1) RETURNING *;";
  const values = [category];

  return { query, values };
};

export const updateCategory = (oldCategory, newCategory) => {
  const query =
    "UPDATE categories SET category = $1 WHERE category = $2 RETURNING *;";
  const values = [newCategory, oldCategory];

  return { query, values };
};

export const deleteCategory = (category) => {
  const query = "DELETE FROM categories WHERE category = $1 RETURNING *;";
  const values = [category];

  return { query, values };
};
