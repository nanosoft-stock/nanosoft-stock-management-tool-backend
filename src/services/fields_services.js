import { pool } from "../config/db.js";

export const getAllFields = async () => {
  const query = `SELECT * FROM fields_view ORDER BY display_order`;
  const values = [];

  const result = await pool.query(query, values);

  return result.rows;
};

export const getCategoryFields = async (category) => {
  const query = `SELECT * FROM fields_view WHERE category = $1 ORDER BY display_order`;
  const values = [category];

  const result = await pool.query(query, values);

  return result.rows;
};

export const addField = async (field) => {
  const query = `INSERT INTO fields 
                 (field, category, datatype, in_sku, is_background, is_lockable, name_case, value_case, display_order, created_by) 
                 SELECT ($1, $2, $3, $4, $5, $6, $7, $8, $9, users_view.id) 
                 FROM users_view WHERE email = $10`;
  const values = [
    field.field,
    field.category,
    field.datatype,
    field.in_sku,
    field.is_background,
    field.is_lockable,
    field.name_case,
    field.value_case,
    field.display_order,
    field.email,
  ];

  await pool.query(query, values);
};

export const updateField = async (field) => {
  const query = `UPDATE fields SET 
                 field = COALESCE($1, field), 
                 category = COALESCE($2, category), 
                 datatype = COALESCE($3, datatype), 
                 in_sku = COALESCE($4, in_sku), 
                 is_background = COALESCE($5, is_background), 
                 is_lockable = COALESCE($6, is_lockable), 
                 name_case = COALESCE($7, name_case), 
                 value_case = COALESCE($8, value_case), 
                 display_order = COALESCE($9, display_order) 
                 WHERE id = $10`;
  const values = [
    field.field,
    field.category,
    field.datatype,
    field.in_sku,
    field.is_background,
    field.is_lockable,
    field.name_case,
    field.value_case,
    field.display_order,
    field.id,
  ];

  await pool.query(query, values);
};

export const deleteFields = async (fields) => {
  let query = `DELETE FROM fields WHERE id = ANY($1::INT[])`;
  const values = [fields.map((field) => field.id)];

  await pool.query(query, values);
};
