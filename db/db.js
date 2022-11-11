const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  user: process.env.DATABASE_USER,
  port: process.env.DATABASE_PORT,
});

// client.on("connect", () => {
//   console.log("Database connected");
// });

// client.on("end", () => {
//   console.log("Connection end");
// });

module.exports = pool;
