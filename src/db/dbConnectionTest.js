const { Client } = require("pg");
require("dotenv").config();

const QUERY = "select * from users";

const testDbConnection = async () => {
  console.log("Testing database connection");
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await client.connect();
  console.log("Connected to the database");
  const { rows } = await client.query(QUERY);
  console.log("Result from the database", rows);
  await client.end();
  console.log("Disconnected from the database");
};

testDbConnection();
