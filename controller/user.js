// const {
//   S3Client,
//   PutObjectCommand,
//   GetObjectCommand,
// } = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
// const sharp = require("sharp");

// //================================AWS S3 BUCKET OLD============================
// const bucketName = process.env.BUCKET_NAME;
// const bucketRegion = process.env.BUCKET_REGION;
// const accessKey = process.env.ACCESS_KEY;
// const secretAccessKey = process.env.SECRET_ACCESS_KEY;

// const s3 = new S3Client({
//   credentials: {
//     accessKeyId: accessKey,
//     secretAccessKey: secretAccessKey,
//   },
//   region: bucketRegion,
// });
// //============================================================================

const pool = require("../db/db");
const queries = require("../queries/queries");

//===========================================================================

const checkCharacterUser = (req, res) => {
  const username = req.params.username;
  pool.query(queries.checkCharacterUser, [username], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getUser = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getUserID = (req, res) => {
  const username = req.params.username;
  pool.query(queries.getUserID, [username], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows[0]);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const validateUsername = (req, res) => {
  const username = req.params.username;
  pool.query(queries.checkUsernameExists, [username], (error, results) => {
    if (error) throw error;
    else if (results.rows.length) {
      return res.json("Username already exists");
    } else {
      return res.json("available");
    }
  });
};

const validateEmail = (req, res) => {
  const email = req.params.email;
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (error) throw error;
    else if (results.rows.length) {
      return res.json("Email already exists");
    } else {
      return res.json("available");
    }
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

// //==================================AWS===========================================
// //upload into s3 bucket===========================================================
// const uploadUserProfileImage = async (req, res) => {
//   console.log("req.body", req.body);
//   console.log("req.file", req.file);

//   // req.file.buffer;

//   //resize image
//   const buffer = await sharp(req.file.buffer)
//     .resize({
//       height: 300,
//       width: 300,
//       fit: "contain",
//     })
//     .toBuffer();

//   const profile_image = req.file.originalname;

//   const params = {
//     Bucket: bucketName,
//     Key: profile_image,
//     Body: buffer,
//     ContentType: req.file.mimetype,
//   };

//   const command = new PutObjectCommand(params);

//   await s3.send(command);
//   //after successfully posted to s3.

//   //upload into database
//   pool.query(
//     queries.uploadUserProfileImageToDB,
//     [profile_image],
//     (error, results) => {
//       if (error) throw error;
//       res.status(201).send("Profile image uploaded successfully!");
//     }
//   );
// };

// const getUserProfileImage = async (req, res) => {
//   try {
//     const posts = await pool.query(queries.getUserProfileImage);

//     // res.status(200).json(results.rows);

//     for (const post of posts.rows) {
//       const getObjectParams = {
//         Bucket: bucketName,
//         Key: post.profile_image,
//       };
//       const command = new GetObjectCommand(getObjectParams);
//       const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
//       post.imageUrl = url;
//     }

//     res.send(posts);
//   } catch (e) {
//     console.error(e);
//   }
// };

// //==================================END OF AWS===========================================

const createUserRatings = (req, res) => {
  const { ratings, reviews, jobs_id } = req.body;

  pool.query(
    queries.createUserRatingsByJobID,
    [ratings, reviews, jobs_id],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Ratings and Reviews submitted Successfully!");
    }
  );
};

const getUserAverageRatingAndTotalJobs = (req, res) => {
  const id = req.params.id;

  pool.query(
    queries.getUserAverageRatingAndTotalJobs,
    [id],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
};

//========================================================================
//========================================================================

//========================================================================
//========================================================================

module.exports = {
  checkCharacterUser,
  validateUsername,
  getUser,
  getUserById,
  getUserID,
  addUser,
  removeUser,
  updateUser,
  createUserRatings,
  validateEmail,
  getUserAverageRatingAndTotalJobs,
  // uploadUserProfileImage,
  // getUserProfileImage,
};
