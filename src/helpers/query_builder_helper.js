export const queryBuilderHelper = (q) => {
  const {
    distinct,
    count,
    columns,
    from,
    join,
    where,
    order_by: orderBy,
    limit,
    offset,
  } = q;

  // SELECT
  let query = "SELECT ";
  let values = [];
  let index = 1;

  // DISTINCT
  if (distinct !== undefined && distinct !== false) {
    query += "DISTINCT ";
  }

  // COUNT(*) OR COLUMNS
  if (count !== undefined && count !== false) {
    query += "COUNT(*)";
  } else {
    query += columns.join(", ");
  }

  // FROM
  query += ` FROM ${from} `;

  // JOIN
  if (join !== undefined && join.length > 0) {
    query += buildJoinClause(join, from);
  }

  // WHERE
  if (where !== undefined && Object.keys(where).length > 0) {
    query += "WHERE ";
    let w = buildWhereClause(where, values, index);
    query += w.query + " ";
    values = w.values;
    index = w.index;
  }

  // ORDER BY
  if (orderBy !== undefined && orderBy.length > 0) {
    query += "ORDER BY ";
    query += orderBy.map((o) => `${o.field} ${o.direction}`).join(", ") + " ";
  }

  // LIMIT
  if (limit !== undefined) {
    query += `LIMIT ${limit} `;
  }

  // OFFSET
  if (offset !== undefined) {
    query += `OFFSET ${offset} `;
  }

  return { query, values };
};

const buildJoinClause = (join, from) => {
  let query = "";

  for (let i = 0; i < join.length; i++) {
    const j = join[i];

    query += `${j.type} JOIN ${j.table} ON ${from}.${j.field} = ${j.table}.${j.field} `;
  }

  return query;
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
