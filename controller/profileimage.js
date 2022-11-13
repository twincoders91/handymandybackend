const pool = require("../db/db");
const queries = require("../queries/queries");

const createProfileImage = (req, res) => {
  const { image_url, user_id, hm_id } = req.body;

  pool.query(
    queries.createProfileImage,
    [image_url, user_id, hm_id],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Profile Image created Successfully!");
    }
  );
};

module.exports = {
  createProfileImage,
};
