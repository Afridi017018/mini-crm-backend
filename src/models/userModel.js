const pool = require("../db");

exports.findUserById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
};

exports.findUserByUsername = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return rows[0];
};


exports.getUserCount = async () => {
  const result = await pool.query("SELECT COUNT(*) FROM users");
  return parseInt(result.rows[0].count, 10);
};
