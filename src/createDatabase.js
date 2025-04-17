const { Client } = require("pg");

async function databaseExists() {
  const adminClient = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: "postgres",
  });

  await adminClient.connect();

  const dbName = process.env.PG_DATABASE.toLocaleLowerCase();
  const result = await adminClient.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);



  if (result.rowCount === 0) {
    console.log(`Creating database: ${dbName}`);
    await adminClient.query(`CREATE DATABASE ${dbName}`);
  } else {
    console.log(`Database ${dbName} already exists.`);
  }

  
  await adminClient.end();
}

module.exports = databaseExists;
