const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "ymw",
  post: 5432,
  password: "password",
  database: "handymandy",
});

// client.on("connect", () => {
//   console.log("Database connected");
// });

// client.on("end", () => {
//   console.log("Connection end");
// });

module.exports = pool;
