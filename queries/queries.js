//==============================LOGIN=============================
const findProfileByUsername =
  "SELECT newId FROM users_auth WHERE username = $1";
const newUserSignUp =
  "INSERT INTO users_auth (newId, username, password) VALUES ($1, $2, $3) RETURNING username";
const userLoginAttempt = "SELECT * FROM users_auth u WHERE u.username = $1";
const populateUserProfileDetails =
  "SELECT * FROM user_profile JOIN users_auth ON user_profile.username = users_auth.username WHERE user_profile.username=$1";
const checkCharacterUser =
  "SELECT user_profile.username FROM user_profile JOIN users_auth ON user_profile.username = users_auth.username WHERE user_profile.username=$1";
const checkCharacterHM =
  "SELECT hm_profile.username FROM hm_profile JOIN users_auth ON hm_profile.username = users_auth.username WHERE hm_profile.username=$1";

// =============================USERS=============================
const getUserID = "SELECT id FROM user_profile WHERE username = $1";
const getUsers = "SELECT * FROM user_profile";
const getUserById = "SELECT * FROM user_profile WHERE id = $1";
const checkEmailExists = "SELECT s FROM user_profile s WHERE s.email = $1";
const checkUsernameExists =
  "SELECT s FROM user_profile s WHERE s.username = $1";
const addUser =
  "INSERT INTO user_profile (username, first_name, last_name, email, street_address, block_number, postal_code, profile_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
const removeUser = "DELETE FROM user_profile WHERE id = $1";
const updateUser =
  "UPDATE user_profile SET first_name = $1, last_name = $2, email = $3, street_address = $4, block_number = $5, postal_code = $6, profile_image = $7 WHERE id = $8";
const updateProfileImageById =
  "SELECT *, profile_image.image_url AS image_url FROM user_profile JOIN profile_image ON user_profile.id = profile_image.user_id WHERE user_profile.id = $1";
const getUserProfileImageById =
  " SELECT profile_image.image_url AS image_url FROM profile_image WHERE profile_image.user_id = $1";

// =============================HANDYMAN=============================
const getHandymanID = "SELECT id FROM hm_profile WHERE username = $1";
const getHandyman = "SELECT * FROM hm_profile";
const getHandymanById = "SELECT * FROM hm_profile WHERE id = $1";
const getHandymanByUsername = "SELECT * FROM hm_profile WHERE username = $1";
const checkHandymanEmailExists =
  "SELECT s FROM hm_profile s WHERE s.email = $1";
const checkHandymanUsernameExists =
  "SELECT s FROM hm_profile s WHERE s.username = $1";
const addHandyman =
  "INSERT INTO hm_profile (username, first_name, last_name, email, business_name, number_of_years, profile_image, specialities, about) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
const updateHandyman =
  "UPDATE hm_profile SET first_name = $1, last_name = $2, email = $3, business_name = $4, number_of_years = $5, profile_image = $6, specialities = $7, about = $8 WHERE id = $9";
const updateHMProfileImageById =
  "SELECT *, profile_image.image_url AS image_url FROM hm_profile JOIN profile_image ON hm_profile.id = profile_image.hm_id WHERE hm_profile.id = $1";
const getHMProfileImageById =
  "SELECT profile_image.image_url AS image_url FROM profile_image WHERE profile_image.hm_id = $1";
// =============================SERVICES=============================
const getServices = "SELECT * FROM hm_services";
const getServiceInfo =
  "SELECT *, hm_services.id AS services_id FROM hm_services JOIN hm_profile ON hm_profile.id = hm_services.hm_id WHERE hm_services.id=$1";
const getServicesByHMId =
  "SELECT *, hm_services.id AS services_id FROM hm_services JOIN hm_profile ON hm_profile.id = hm_services.hm_id WHERE hm_id=$1  AND hm_services.active = 'live'";
const addServices =
  "INSERT INTO hm_services (hm_id, description, category, types_of_work, price_from, title, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const removeServicesById = "DELETE FROM hm_services WHERE id = $1";
const updateServicesById =
  "UPDATE hm_services SET description = $1, category = $2, types_of_work = $3, price_from = $4, title=$5 WHERE id = $6";
const filterServicesByCategory =
  "SELECT *, hm_services.id AS services_id FROM hm_services JOIN hm_profile ON hm_profile.id = hm_services.hm_id WHERE hm_services.category = $1";
const updateServiceActiveById =
  "UPDATE hm_services SET active = 'inactive' WHERE id = $1";
const filterCountTotalJobs =
  "SELECT services_id AS services_id, COUNT(services_id) AS total_jobs FROM jobs GROUP BY services_id";

// =============================JOBS=============================
const getJobs = "SELECT * FROM jobs";
const createJob =
  "INSERT INTO jobs (user_id, services_id, status_id, job_requirement) VALUES ($1, $2, $3, $4)";
const removeJobById = "DELETE FROM jobs WHERE id = $1";
const updateJobById =
  "UPDATE jobs SET status_id = $1, user_ack = 'before', hm_ack = 'before' WHERE id = $2";
const filterJobRequestsByUser =
  "SELECT *, hm_profile.first_name AS hm_first_name, jobs.id AS jobs_id FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN status ON status.job_status = jobs.status_id WHERE jobs.user_id =$1";
const filterJobRequestsByHM =
  "SELECT *, jobs.id AS jobs_id FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN status ON status.job_status = jobs.status_id WHERE hm_id =$1";
const filterJobRequestByHMWithUserProfile =
  "SELECT *, jobs.id AS jobs_id, user_profile.id AS user_id, user_profile.first_name AS user_first_name, user_profile.last_name AS user_last_name, user_profile.email AS user_email, user_profile.username AS user_username, user_profile.street_address AS user_street_address, user_profile.profile_image AS user_profile_image, user_profile.postal_code AS user_postal_code, hm_profile.id AS hm_id, hm_profile.username AS hm_username, hm_profile.first_name AS hm_first_name, hm_profile.last_name AS hm_last_name, hm_profile.email AS hm_email, hm_profile.profile_image AS hm_profile_image FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN user_profile ON user_profile.id = user_id JOIN status ON status.job_status = jobs.status_id WHERE hm_id =$1";

// const filterJobRequestByHMWithUserProfile =
//   "SELECT * FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN user_profile ON user_profile.id = user_id JOIN status ON status.job_status = jobs.status_id WHERE hm_id =$1";
// const filterJobRequestByHMWithUserProfile =
//   "SELECT hm_profile.id AS hm_id, user_profile.id AS user_id, hm_profile.first_name AS hm_first_name, user_profile.first_name AS user_first_name FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN user_profile ON user_profile.id = user_id JOIN status ON status.job_status = jobs.status_id WHERE hm_id =$1";

// =============================RATINGS=============================
const getAllRatingsForHMByIdAndStatus =
  "SELECT * FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN status ON status.job_status = jobs.status_id WHERE jobs.status_id = 'completed' AND hm_id = $1";
const getHandymanRatingsSummary =
  "SELECT * FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN user_profile ON user_profile.id = jobs.user_id JOIN ratings_and_reviews ON ratings_and_reviews.jobs_id = jobs.id JOIN status ON status.job_status = jobs.status_id WHERE jobs.status_id = 'completed' AND hm_id = $1";
const getHandymanAverageRatingAndTotalJobs =
  "SELECT hm_id, SUM(ratings) AS total_ratings, COUNT(*) AS total_jobs, ROUND(SUM(ratings)/COUNT(*), 1) AS average_rating FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN status ON status.job_status = jobs.status_id JOIN ratings_and_reviews ON ratings_and_reviews.jobs_id = jobs.id WHERE jobs.status_id = 'completed' AND hm_id = $1 GROUP BY hm_id";
const getUserAverageRatingAndTotalJobs =
  "SELECT user_id, SUM(ratings) AS total_ratings, COUNT(*) AS total_jobs, ROUND(SUM(ratings)/COUNT(*), 1) AS average_rating FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN user_profile ON user_profile.id = user_id JOIN status ON status.job_status = jobs.status_id JOIN ratings_and_reviews ON ratings_and_reviews.jobs_id = jobs.id WHERE jobs.status_id = 'completed' AND user_id = $1 GROUP BY user_id";
const createUserRatingsByJobID =
  "INSERT INTO ratings_and_reviews (ratings, reviews, jobs_id) VALUES ($1, $2, $3)";
const removeRatingByJobID =
  "DELETE FROM ratings_and_reviews WHERE jobs_id = $1";
// ==================================================================
// =============================IMAGES=============================
const createProfileImage =
  "INSERT INTO profile_image (image_url, user_id, hm_id) VALUES ($1, $2, $3)";
const updateProfileImageTable =
  "UPDATE profile_image SET image_url = $1 WHERE user_id = $2";
const updateHMProfileImageTable =
  "UPDATE profile_image SET image_url = $1 WHERE hm_id = $2";
const createInboxImage =
  "INSERT INTO inbox (jobs_id, user_id, hm_id, character, inboximage_url) VALUES ($1, $2, $3, $4, $5)";

// =============================INBOX=============================
const createMessage =
  "INSERT INTO inbox (jobs_id, user_id, hm_id, character, message) VALUES ($1, $2, $3, $4, $5)";
const filterMessageByJobId = "SELECT * FROM inbox WHERE jobs_id =$1";
// =============================NOTIFICATIONS=============================
const userNotifications =
  "SELECT * FROM jobs JOIN hm_services ON hm_services.id = services_id JOIN hm_profile ON hm_profile.id = hm_services.hm_id LEFT OUTER JOIN profile_image ON hm_profile.id = profile_image.hm_id WHERE (status_id = 'inprogress' OR status_id = 'cancelled') AND jobs.user_id =$1 AND user_ack='before'";
const updateUserNotifications =
  "UPDATE jobs SET user_ack = 'after' WHERE user_id =$1 AND status_id = 'inprogress' OR status_id = 'cancelled'";
const handymanNotifications =
  "SELECT *  FROM jobs JOIN user_profile ON user_profile.id = user_id JOIN hm_services ON hm_services.id = services_id LEFT OUTER JOIN profile_image ON profile_image.user_id = jobs.user_id WHERE (status_id = 'pending' OR status_id = 'completed') AND hm_services.hm_id = $1 AND hm_ack = 'before'";
const updateHMNotifications =
  "UPDATE jobs SET hm_ack = 'after' WHERE services_id IN (SELECT id FROM hm_services WHERE hm_services.hm_id = $1) AND (status_id = 'pending' OR status_id = 'completed')";

module.exports = {
  getUsers,
  getUserById,
  checkEmailExists,
  checkUsernameExists,
  addUser,
  removeUser,
  updateUser,
  getHandyman,
  getHandymanById,
  checkHandymanEmailExists,
  checkHandymanUsernameExists,
  addHandyman,
  getServices,
  getServicesByHMId,
  addServices,
  getServiceInfo,
  removeServicesById,
  updateServicesById,
  updateHandyman,
  getJobs,
  createJob,
  removeJobById,
  updateJobById,
  filterServicesByCategory,
  filterJobRequestsByUser,
  getAllRatingsForHMByIdAndStatus,
  getHandymanByUsername,
  getHandymanRatingsSummary,
  filterJobRequestsByHM,
  filterJobRequestByHMWithUserProfile,
  createUserRatingsByJobID,
  getHandymanAverageRatingAndTotalJobs,
  getHandymanID,
  getUserID,
  findProfileByUsername,
  newUserSignUp,
  userLoginAttempt,
  checkCharacterUser,
  checkCharacterHM,
  getUserAverageRatingAndTotalJobs,
  removeRatingByJobID,
  updateServiceActiveById,
  createProfileImage,
  updateProfileImageById,
  updateProfileImageTable,
  updateHMProfileImageById,
  updateHMProfileImageTable,
  getUserProfileImageById,
  getHMProfileImageById,
  filterCountTotalJobs,
  createMessage,
  filterMessageByJobId,
  userNotifications,
  updateUserNotifications,
  handymanNotifications,
  updateHMNotifications,
  createInboxImage,
};
