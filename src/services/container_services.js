export const getAllContainers = async (executeQuery) => {
    const query = "SELECT * FROM containers;";
    const values = [];
  
    return await executeQuery(query, values);
  };
  
  export const addNewContainer = async (executeQuery, container_id, status) => {
    const query =
      "INSERT INTO containers (container_id, status) VALUES ($1, $2) RETURNING *;";
    const values = [container_id, status];
  
    return await executeQuery(query, values);
  };
  
  export const addNewContainers = async (executeQuery, body) => {
    let query = "INSERT INTO containers (container_id, status) VALUES ";
    const values = [];
  
    let index = 1;
    query += body
      .map((entry) => {
        values.push(entry.container_id, entry.status);
        return `($${index++}, $${index++})`;
      })
      .join(", ");
  
    query += " RETURNING *;";
  
    return await executeQuery(query, values);
  };
  
  export const updateContainer = async (executeQuery, container_id, status) => {
    const query = "UPDATE containers SET status = $1 WHERE container_id = $2 RETURNING *;";
    const values = [status, container_id];
  
    return await executeQuery(query, values);
  };
  