const pool = require("./db");
const bcrypt = require("bcryptjs");

async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user'
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT NOT NULL,
        company TEXT NOT NULL,
        tags TEXT
      )
    `);


    const adminUsername = "admin";
    const adminPassword = "admin";
    const adminHash = bcrypt.hashSync(adminPassword, 10);

    const adminExists = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [adminUsername]
    );

    if (adminExists.rowCount === 0) {
      await pool.query(
        `INSERT INTO users (username, password, role) VALUES ($1, $2, 'admin')`,
        [adminUsername, adminHash]
      );
      console.log("Default admin user created (username: admin)");
    }


    const regularUsername = "user";
    const regularPassword = "user";
    const userHash = bcrypt.hashSync(regularPassword, 10);

    const userExists = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [regularUsername]
    );

    if (userExists.rowCount === 0) {
      await pool.query(
        `INSERT INTO users (username, password, role) VALUES ($1, $2, 'user')`,
        [regularUsername, userHash]
      );
      console.log("Default regular user created (username: user)");
    }
  } catch (error) {
    console.error("Error initializing database:", error.message);
    process.exit(1);
  }
}

module.exports = initDb;
