const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const pool = require("../db/db");
const queries = require("../queries/queries");

//===================================LOGIN==================================
const login = async (req, res) => {
  try {
    const potentialLogin = await pool.query(queries.userLoginAttempt, [
      req.body.username,
    ]);

    if (potentialLogin.rowCount > 0) {
      const isSamePass = await bcrypt.compare(
        req.body.password,
        potentialLogin.rows[0].password
      );
      if (isSamePass) {
        const payload = {
          id: potentialLogin.newid,
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
          expiresIn: "20m",
          jwtid: uuidv4(),
        });

        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
          expiresIn: "30d",
          jwtid: uuidv4(),
        });

        const response = {
          status: "ok",
          message: "login successful",
          id: potentialLogin.newid,
          refreshToken,
          accessToken,
        };

        res.json(response);
      } else {
        res.json({ loggedIn: false, status: "Wrong username or password!" });
      }
    } else {
      res.json({ loggedIn: false, status: "Wrong username or password!" });
    }
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ status: "error", message: "failed to login" });
  }
};

//===================================SIGNUP==================================

const signup = async (req, res) => {
  try {
    const foundUser = await pool.query(queries.findProfileByUsername, [
      req.body.username,
    ]);
    if (foundUser.rowCount === 0) {
      const newId = uuidv4();
      //register
      const hashedPass = await bcrypt.hash(req.body.password, 12);

      const payload = {
        id: newId,
      };

      const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
        expiresIn: "20m",
        jwtid: uuidv4(),
      });

      const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: "30d",
        jwtid: uuidv4(),
      });

      await pool.query(queries.newUserSignUp, [
        newId,
        req.body.username,
        hashedPass,
      ]);

      const response = {
        status: "ok",
        message: "user created successfully",
        id: newId,
        accessToken,
        refreshToken,
      };

      res.json(response);
    } else {
      res.json({ loggedIn: false, status: "Username taken" });
    }
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ status: "error", message: "failed to sign up" });
  }
};

module.exports = {
  signup,
  login,
};
