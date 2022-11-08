const pool = require("../db/db");
const queries = require("../queries/queries");

const getJobs = (req, res) => {
  pool.query(queries.getJobs, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const createJob = (req, res) => {
  const { user_id, services_id, ratings_id, status_id } = req.body;

  pool.query(
    queries.createJob,
    [user_id, services_id, ratings_id, status_id],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Job created successfully!");
      console.log("Job created");
    }
  );
};

const removeJobById = (req, res) => {
  const id = parseInt(req.body.id);

  pool.query(queries.removeJobById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send("Jobs removed successfully!");
  });
};

const updateJobById = (req, res) => {
  const id = parseInt(req.body.id);
  const { ratings_id, status_id } = req.body;

  pool.query(
    queries.updateJobById,
    [ratings_id, status_id, id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send("Job updated successfully!");
    }
  );
};

const filterJobRequestsByUser = (req, res) => {
  const { id } = req.params;

  pool.query(queries.filterJobRequestsByUser, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getJobs,
  createJob,
  removeJobById,
  updateJobById,
  filterJobRequestsByUser,
};
