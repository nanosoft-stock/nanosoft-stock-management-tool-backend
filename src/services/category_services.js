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

export const updateCategory = (categoryUUID, category) => {
  const query =
    "UPDATE categories SET category = $1 WHERE category_uuid = $2 RETURNING *;";
  const values = [category, categoryUUID];

  return { query, values };
};

export const deleteCategory = (categoryUUID) => {
  const query = "DELETE FROM categories WHERE category_uuid = $1 RETURNING *;";
  const values = [categoryUUID];

  return { query, values };
};
