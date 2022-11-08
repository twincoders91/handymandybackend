const pool = require("../db/db");
const queries = require("../queries/queries");

const getReviews = (req, res) => {
  pool.query(queries.getReviews, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getReviews,
};
