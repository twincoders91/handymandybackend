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
const checkHandymanEmailExists =
  "SELECT s FROM hm_profile s WHERE s.email = $1";
const checkHandymanUsernameExists =
  "SELECT s FROM hm_profile s WHERE s.username = $1";
const addHandyman =
  "INSERT INTO hm_profile (username, first_name, last_name, email, business_name, number_of_years, profile_image, specialities) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
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
  "INSERT INTO jobs (user_id, services_id, ratings_id, status_id) VALUES ($1, $2, $3, $4)";
const removeJobById = "DELETE FROM jobs WHERE id = $1";
const updateJobById =
  "UPDATE jobs SET ratings_id = $1, status_id = $2 WHERE id = $3";
const filterJobRequestsByUser =
  "SELECT * FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN status ON status.id = jobs.status_id WHERE jobs.user_id =$1";

// =============================RATINGS=============================
const getAllRatingsForHMByIdAndStatus =
  "SELECT * FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN status ON status.id = jobs.status_id WHERE jobs.status_id = 4 AND hm_id = $1";

// const getAggregatedRatingsForHMByIdAndStatus =
//   "SELECT SUM(ratings_id) AS total_ratings FROM jobs JOIN hm_services ON hm_services.id = jobs.services_id JOIN hm_profile ON hm_profile.id = hm_id JOIN status ON status.id = jobs.status_id WHERE jobs.status_id = 4 AND hm_id = $1";
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
};
