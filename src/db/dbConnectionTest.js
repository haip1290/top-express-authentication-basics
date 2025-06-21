const { Client } = require("pg");
require("dotenv").config();

const QUERY = "select * from users";

const testDbConnection = async () => {
  console.log("Testing database connection");
  console.log("password", process.env.DB_PASSWORD);
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await client.connect();
  console.log("Connected to the database");
  await client.query(QUERY);
  await client.end();
  console.log("Disconnected from the database");
};

testDbConnection();
