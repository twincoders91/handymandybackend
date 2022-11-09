// =============================USERS=============================
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
// =============================HANDYMAN=============================
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
  "UPDATE hm_profile SET first_name = $1, last_name = $2, email = $3, business_name = $4, number_of_years = $5, profile_image = $6, specialities = $7 WHERE id = $8";
// SELECT service_categories.name, hm_profile.specialities FROM hm_profile
// JOIN service_categories ON hm_profile.specialities = service_categories.id

// =============================SERVICES=============================
const getServices = "SELECT * FROM hm_services";
const getServiceInfo =
  "SELECT * FROM hm_services JOIN hm_profile ON hm_profile.id = hm_services.hm_id WHERE hm_services.id=$1";
const addServices =
  "INSERT INTO hm_services (hm_id, description, category, types_of_work, price_from) VALUES ($1, $2, $3, $4, $5)";
const removeServicesById = "DELETE FROM hm_services WHERE id = $1";
const updateServicesById =
  "UPDATE hm_services SET description = $1, category = $2, types_of_work = $3, price_from = $4 WHERE id = $5";
const filterServicesByCategory =
  "SELECT * FROM hm_services JOIN hm_profile ON hm_profile.id = hm_services.hm_id WHERE hm_services.category = $1";

// =============================JOBS=============================
const getJobs = "SELECT * FROM jobs";
const createJob =
  "INSERT INTO jobs (user_id, services_id, status_id) VALUES ($1, $2, $3)";
const removeJobById = "DELETE FROM jobs WHERE id = $1";
const updateJobById = "UPDATE jobs SET status_id = $1 WHERE id = $2";
const filterJobRequestsByUser =
  "SELECT * FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN status ON status.job_status = jobs.status_id WHERE jobs.user_id =$1";
const filterJobRequestsByHM =
  "SELECT * FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN status ON status.job_status = jobs.status_id WHERE hm_id =$1";
const filterJobRequestByHMWithUserProfile =
  "SELECT *, hm_profile.id AS hm_id, hm_profile.username AS hm_username, hm_profile.first_name AS hm_first_name, hm_profile.last_name AS hm_last_name, hm_profile.email AS hm_email, hm_profile.profile_image AS hm_profile_image FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN user_profile ON user_profile.id = user_id JOIN status ON status.job_status = jobs.status_id WHERE hm_id =$1";
// const filterJobRequestByHMWithUserProfile =
//   "SELECT * FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN user_profile ON user_profile.id = user_id JOIN status ON status.job_status = jobs.status_id WHERE hm_id =$1";
// const filterJobRequestByHMWithUserProfile =
//   "SELECT hm_profile.id AS hm_id, user_profile.id AS user_id, hm_profile.first_name AS hm_first_name, user_profile.first_name AS user_first_name FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN user_profile ON user_profile.id = user_id JOIN status ON status.job_status = jobs.status_id WHERE hm_id =$1";

// =============================RATINGS=============================
const getAllRatingsForHMByIdAndStatus =
  "SELECT * FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN status ON status.job_status = jobs.status_id WHERE jobs.status_id = 'pending' AND hm_id = $1";
const getHandymanRatingsSummary =
  "SELECT * FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN ratings_and_reviews ON ratings_and_reviews.jobs_id = jobs.id JOIN status ON status.job_status = jobs.status_id WHERE jobs.status_id = 'completed' AND hm_id = $1";
const getHandymanAverageRatingAndTotalJobs =
  "SELECT hm_id, SUM(ratings) AS total_ratings, COUNT(*) AS total_jobs, ROUND(SUM(ratings)/COUNT(*), 1) AS average_rating FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN status ON status.job_status = jobs.status_id JOIN ratings_and_reviews ON ratings_and_reviews.jobs_id = jobs.id WHERE jobs.status_id = 'completed' AND hm_id = $1 GROUP BY hm_id";
const createUserRatingsByJobID =
  "INSERT INTO ratings_and_reviews (ratings, reviews, jobs_id) VALUES ($1, $2, $3)";
// ==================================================================

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
};
