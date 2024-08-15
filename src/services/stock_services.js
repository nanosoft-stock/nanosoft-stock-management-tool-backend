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
  query += "ORDER BY stocks.date DESC, stocks.item_id DESC LIMIT 100;";

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
  let values = [];
  let index = 1;

  if (distinct !== undefined && distinct !== false) {
    query += "DISTINCT ";
  }

  if (count !== undefined && count !== false) {
    query += "COUNT(*)";
  } else {
    query += columns.join(", ");
  }

  query += " FROM stocks ";

  if (join !== undefined && join.length > 0) {
    query += join
      .map(
        (j) =>
          `${j.type.toUpperCase()} JOIN ${j.table} ON stocks.${j.field} = ${
            j.table
          }.${j.field}`
      )
      .join(" ");
  }

  if (where !== undefined && Object.keys(where).length > 0) {
    query += " WHERE ";
    let w = buildWhereClause(where, values, index);
    console.log(w);
    query += w.query;
    values = w.values;
    index = w.index;
  }

  if (orderBy !== undefined && orderBy.length > 0) {
    query += " ORDER BY ";
    query += orderBy.map((o) => `${o.field} ${o.direction}`).join(", ");
  }

  if (limit !== undefined) {
    query += ` LIMIT ${limit}`;
  }

  if (offset !== undefined) {
    query += ` OFFSET ${offset}`;
  }

  query += ";";

  console.log(query, values);

  return { query, values };
};

const buildWhereClause = (where, values, index) => {
  let query = "";
  if (where.type === "AND") {
    let ands = [];
    for (let i = 0; i < where.nodes.length; i++) {
      let w = buildWhereClause(where.nodes[i], values, index);
      ands.push(w.query);
      values = w.values;
      index = w.index;
    }
    query = "(" + ands.join(" AND ") + ")";
  } else if (where.type === "OR") {
    let ors = [];
    for (let i = 0; i < where.nodes.length; i++) {
      let w = buildWhereClause(where.nodes[i], values, index);
      ors.push(w.query);
      values = w.values;
      index = w.index;
    }
    query = "(" + ors.join(" OR ") + ")";
  } else {
    let data = where.data;
    if (data.op === "IN") {
      query = `${data.field}${data.not === true ? " NOT " : " "}${
        data.op
      } (${data.value.map((_) => `$${index++}`).join(", ")})`;

      values.push(...data.value);
    } else {
      query = `${data.field}${data.not === true ? " NOT " : " "}${
        data.op
      } $${index++}`;

      values.push(data.value);
    }
  }
  return {
    query: query,
    values: values,
    index: index,
  };
};
