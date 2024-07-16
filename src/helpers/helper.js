export function queryHelper(table, body) {
  const { columns, count, distinct, limit, offset, order_by, where } = body;

  let statement = `SELECT`;

  if (distinct == true) {
    statement += ` DISTINCT`;
  }

  if (count == true) {
    statement += ` COUNT(*)`;
  }

  if (columns) {
    statement += ` ${columns.join(", ")}`;
  }

  statement += ` FROM ${table}`;

  let values = [];
  let index = 1;

  if (where) {
    let conditions = [];
    for (let { field, op, value } of where) {
      conditions.push(`${field} ${op} $${index}`);
      values.push(value);
      index++;
    }

    statement += " WHERE " + conditions.join(" AND ");
  }

  if (order_by) {
    let conditions = [];
    for (let { field, value } of order_by) {
      conditions.push(`${field} ${value}`);
    }

    statement += " ORDER BY " + conditions.join(", ");
  }

  if (limit) {
    statement += " LIMIT " + limit;
  }

  if (offset) {
    statement += " OFFSET " + offset;
  }

  statement += ";";

  return { statement: statement, values: values };
}
