const pool = require("../db/db");
const queries = require("../queries/queries");

const getUser = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addUser = (req, res) => {
  const {
    username,
    first_name,
    last_name,
    email,
    street_address,
    block_number,
    postal_code,
    profile_image,
  } = req.body;

  //ensure no duplicate checks.
  //check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      return res.send("Email already exists.");
    }

    pool.query(queries.checkUsernameExists, [username], (error, results) => {
      if (results.rows.length) {
        return res.send("Username already exists.");
      }
      // add User to db
      pool.query(
        queries.addUser,
        [
          username, //$1
          first_name, //$2
          last_name,
          email,
          street_address,
          block_number,
          postal_code,
          profile_image,
        ],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("User account created Successfully!");
          console.log("User created");
        }
      );
    });
  });
};

const removeUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getUserById, [id], (error, results) => {
    const noUserFound = !results.rows.length;
    if (noUserFound) {
      return res.send("User does not exist in the database");
    }

    pool.query(queries.removeUser, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("User removed successfully.");
    });
  });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    first_name,
    last_name,
    email,
    street_address,
    block_number,
    postal_code,
    profile_image,
  } = req.body;

  pool.query(queries.getUserById, [id], (error, results) => {
    const noUserFound = !results.rows.length;
    if (noUserFound) {
      return res.send("User does not exist in the database");
    }

    pool.query(
      queries.updateUser,
      [
        first_name,
        last_name,
        email,
        street_address,
        block_number,
        postal_code,
        profile_image,
        id,
      ],
      (error, results) => {
        if (error) throw error;
        res.status(200).send("User updated successfully");
      }
    );
  });
};

module.exports = {
  getUser,
  getUserById,
  addUser,
  removeUser,
  updateUser,
};
