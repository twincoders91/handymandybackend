const { parse } = require("dotenv");
const pool = require("../db/db");
const queries = require("../queries/queries");

const checkCharacterHM = (req, res) => {
  const username = req.params.username;
  pool.query(queries.checkCharacterHM, [username], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getHandyman = (req, res) => {
  pool.query(queries.getHandyman, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getHandymanID = (req, res) => {
  const username = req.params.username;
  pool.query(queries.getHandymanID, [username], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows[0]);
  });
};

const getHandymanByUsername = (req, res) => {
  const username = req.params.username;
  pool.query(queries.getHandymanByUsername, [username], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getHandymanById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getHandymanById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const validateUsername = (req, res) => {
  const username = req.params.username;
  pool.query(
    queries.checkHandymanUsernameExists,
    [username],
    (error, results) => {
      if (error) throw error;
      else if (results.rows.length) {
        return res.json("Username already exists");
      } else {
        return res.json("available");
      }
    }
  );
};

const validateEmail = (req, res) => {
  const email = req.params.email;
  pool.query(queries.checkHandymanEmailExists, [email], (error, results) => {
    if (error) throw error;
    else if (results.rows.length) {
      return res.json("Email already exists");
    } else {
      return res.json("available");
    }
  });
};

const addHandyman = (req, res) => {
  const {
    username,
    first_name,
    last_name,
    email,
    business_name,
    number_of_years,
    profile_image,
    specialities,
    about,
  } = req.body;

  pool.query(queries.checkHandymanEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      return res.send("Email already exists.");
    }

    pool.query(
      queries.checkHandymanUsernameExists,
      [username],
      (error, results) => {
        if (results.rows.length) {
          return res.send("Username already exists.");
        }

        pool.query(
          queries.addHandyman,
          [
            username,
            first_name,
            last_name,
            email,
            business_name,
            number_of_years,
            profile_image,
            specialities,
            about,
          ],
          (error, results) => {
            if (error) throw error;
            res.status(201).send("Handyman account created Successfully!");
            console.log("Handyman created");
          }
        );
      }
    );
  });
};

const updateHandyman = (req, res) => {
  const id = parseInt(req.body.id);
  const {
    first_name,
    last_name,
    email,
    business_name,
    number_of_years,
    profile_image,
    specialities,
    about,
  } = req.body;

  pool.query(queries.getHandymanById, [id], (error, results) => {
    const noHandymanFound = !results.rows.length;
    if (noHandymanFound) {
      return res.send("Handyman does not exist in the database");
    }

    pool.query(
      queries.updateHandyman,
      [
        first_name,
        last_name,
        email,
        business_name,
        number_of_years,
        profile_image,
        specialities,
        about,
        id,
      ],
      (error, results) => {
        if (error) throw error;
        res.status(200).send("Handyman updated successfully");
      }
    );
  });
};

const getAllRatingsForHMByIdAndStatus = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    queries.getAllRatingsForHMByIdAndStatus,
    [id],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

const getHandymanRatingsSummary = (req, res) => {
  const id = req.params.id;

  pool.query(queries.getHandymanRatingsSummary, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getHandymanAverageRatingAndTotalJobs = (req, res) => {
  const id = req.params.id;

  pool.query(
    queries.getHandymanAverageRatingAndTotalJobs,
    [id],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

const updateHMProfileImageById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.updateHMProfileImageById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getHandyman,
  getHandymanID,
  getHandymanById,
  addHandyman,
  updateHandyman,
  getAllRatingsForHMByIdAndStatus,
  getHandymanByUsername,
  getHandymanRatingsSummary,
  validateUsername,
  validateEmail,
  getHandymanAverageRatingAndTotalJobs,
  checkCharacterHM,
  updateHMProfileImageById,
};
