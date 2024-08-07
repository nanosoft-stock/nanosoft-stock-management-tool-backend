const commonColumns = [
  "date",
  "category",
  "sku_uuid",
  "serial_number",
  "item_id",
  "container_id",
  "warehouse_location_id",
  "supplier_info",
  "comments",
  "user_uuid",
];

export const getStock = async (itemId, executeQuery) => {
  let query = "SELECT stocks.*, ";

  const categories = (
    await executeQuery("SELECT category FROM categories;")
  ).map((category) => category["category"]);

  const selectClauses = [];
  const joinClauses = [];

  for (let category of categories) {
    const category_name = category;
    category = category.replace(/ /g, "_").toLowerCase();

    selectClauses.push(
      `row_to_json(${category}_specifications.*) AS ${category}`
    );
    joinClauses.push(
      `LEFT JOIN ${category}_specifications ON stocks.item_id = ${category}_specifications.item_id AND stocks.category = '${category_name}'`
    );
  }

  query += selectClauses.join(", ");
  query += ", users.username";
  query += " FROM stocks ";
  query += joinClauses.join(" ");
  query += ` LEFT OUTER JOIN users ON stocks.user_uuid = users.user_uuid `;
  query += " WHERE stocks.item_id = $1;";

  const values = [itemId];

  return { query, values };
};

export const getAllStocks = async (executeQuery) => {
  let query = "SELECT stocks.*, ";

  const categories = (
    await executeQuery("SELECT category FROM categories;")
  ).map((category) => category["category"]);

  const selectClauses = [];
  const joinClauses = [];

  for (let category of categories) {
    const category_name = category;
    category = category.replace(/ /g, "_").toLowerCase();

    selectClauses.push(
      `row_to_json(${category}_specifications.*) AS ${category}`
    );
    joinClauses.push(
      `LEFT OUTER JOIN ${category}_specifications ON stocks.item_id = ${category}_specifications.item_id AND stocks.category = '${category_name}'`
    );
  }

  query += selectClauses.join(", ");
  query += ", users.username";
  query += " FROM stocks ";
  query += joinClauses.join(" ");
  query += ` LEFT OUTER JOIN users ON stocks.user_uuid = users.user_uuid `;
  query += "ORDER BY date DESC;";

  const values = [];

  return { query, values };
};

export const addStock = async (stock, executeQuery) => {
  const keys = Object.keys(stock);

  const stockColumns = {};
  const categoryBasedColumns = {};

  for (let key of keys) {
    if (key == "item_id") {
      categoryBasedColumns[key] = stock[key];
    }

    if (commonColumns.includes(key)) {
      stockColumns[key] = stock[key];
    } else {
      categoryBasedColumns[key] = stock[key];
    }
  }

  let stockQuery = "INSERT INTO stocks (";
  const stockValues = [];
  let index = 1;

  stockQuery += Object.keys(stockColumns).join(", ");
  stockQuery += ") VALUES ";

  stockQuery += "(";
  stockQuery += Object.keys(stockColumns)
    .map((_) => `$${index++}`)
    .join(", ");
  stockQuery += ");";

  stockValues.push(...Object.values(stockColumns));

  await executeQuery(stockQuery, stockValues);

  const categoryKey = stock.category.replace(" ", "_").toLowerCase();
  let categoryBasedQuery = `INSERT INTO ${categoryKey}_specifications (`;
  const categoryBasedValues = [];
  index = 1;

  categoryBasedQuery += Object.keys(categoryBasedColumns).join(", ");
  categoryBasedQuery += ") VALUES ";

  categoryBasedQuery += "(";
  categoryBasedQuery += Object.keys(categoryBasedColumns)
    .map((_) => `$${index++}`)
    .join(", ");
  categoryBasedQuery += ");";

  categoryBasedValues.push(...Object.values(categoryBasedColumns));

  await executeQuery(categoryBasedQuery, categoryBasedValues);

  return await getStock(stock.item_id, executeQuery);
};

export const queryStocks = async (q, executeQuery) => {
  const {
    distinct,
    count,
    columns,
    join,
    where,
    order_by: orderBy,
    limit,
    offset,
  } = q;

  let query = "SELECT ";
  const values = [];
  let index = 1;

  if (distinct) {
    query += "DISTINCT ";
  }

  if (count) {
    query += "COUNT(*) ";
  } else {
    query += columns.join(", ");
  }

  query += " FROM stocks ";

  if (join) {
    query += join
      .map(
        (j) =>
          `${j.type.toUpperCase()} JOIN ${j.table} ON stocks.${j.field} = ${
            j.table
          }.${j.field}`
      )
      .join(" ");
  }

  if (where) {
    query += " WHERE ";
    query += where
      .map(
        (w) => `${w.field}${w.not === true ? " NOT " : " "}${w.op} $${index++}`
      )
      .join(" AND ");
    values.push(...where.map((w) => w.value));
  }

  if (orderBy) {
    query += " ORDER BY ";
    query += orderBy.map((o) => `${o.field} ${o.direction}`).join(", ");
  }

  if (limit) {
    query += ` LIMIT ${limit}`;
  }

  if (offset) {
    query += ` OFFSET ${offset}`;
  }

  query += ";";

  return { query, values };
};
