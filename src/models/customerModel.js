const pool = require("../db");

exports.getCustomers = async (search, tag, page = 1, limit = 10) => {
  let query = "SELECT * FROM customers";
  let conditions = [];
  let params = [];

  if (search) {
    params.push(`%${search}%`);
    conditions.push(`(name ILIKE $${params.length} OR email ILIKE $${params.length} OR phone ILIKE $${params.length})`);
  }


  if (tag) {
    params.push(`%${tag}%`);
    conditions.push(`tags ILIKE $${params.length}`);
  }


  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }


  const countQuery = "SELECT COUNT(*) FROM customers" + (conditions.length > 0 ? " WHERE " + conditions.join(" AND ") : "");
  const countResult = await pool.query(countQuery, params);
  const totalCount = parseInt(countResult.rows[0].count);


  const totalPages = Math.ceil(totalCount / limit);


  const offset = (page - 1) * limit;
  query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(limit, offset);


  const { rows } = await pool.query(query, params);

  return { customers: rows, totalPages };
};


exports.createCustomer = async (data) => {
  const { name, email, phone, company, tag } = data;
  const { rows } = await pool.query(
    `INSERT INTO customers (name, email, phone, company, tags) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, phone, company, tag]
  );
  return rows[0];
};

exports.updateCustomer = async (id, data) => {
  const { name, email, phone, company, tag } = data;
  const { rows } = await pool.query(
    `UPDATE customers 
     SET name=$1, email=$2, phone=$3, company=$4, tags=$5 
     WHERE id=$6 RETURNING *`,
    [name, email, phone, company, tag, id]
  );
  return rows[0];
};

exports.deleteCustomer = async (id) => {
  await pool.query("DELETE FROM customers WHERE id = $1", [id]);
  
};


exports.getCount = async () => {
  const result = await pool.query("SELECT COUNT(*) FROM customers");
  return parseInt(result.rows[0].count, 10);
};

