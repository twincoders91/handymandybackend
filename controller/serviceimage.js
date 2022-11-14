const pool = require("../db/db");
const queries = require("../queries/queries");

const createServiceImage = (req, res) => {
  const { image_url, hm_id } = req.body;

  pool.query(
    queries.createProfileImage,
    [image_url, hm_id],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Service Image created Successfully!");
    }
  );
};

module.exports = {
  createServiceImage,
};
