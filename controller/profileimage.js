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

const updateProfileImageTable = (req, res) => {
  const user_id = parseInt(req.body.user_id);
  const { image_url } = req.body;

  pool.query(
    queries.updateProfileImageTable,
    [image_url, user_id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send("Profile Image updated successfully!");
    }
  );
};

const updateHMProfileImageTable = (req, res) => {
  const hm_id = parseInt(req.body.hm_id);
  const { image_url } = req.body;

  pool.query(
    queries.updateHMProfileImageTable,
    [image_url, hm_id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send("HM Profile Image updated successfully!");
    }
  );
};

module.exports = {
  createProfileImage,
  updateProfileImageTable,
  updateHMProfileImageTable,
};
