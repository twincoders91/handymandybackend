const pool = require("../db/db");
const queries = require("../queries/queries");

const createMessage = (req, res) => {
  const { jobs_id, user_id, hm_id, character, message } = req.body;

  pool.query(
    queries.createMessage,
    [jobs_id, user_id, hm_id, character, message],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Message created successfully!");
      console.log("Message created");
    }
  );
};

const filterMessageByJobId = (req, res) => {
  const { jobs_id } = req.params;

  pool.query(queries.filterMessageByJobId, [jobs_id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  createMessage,
  filterMessageByJobId,
};
