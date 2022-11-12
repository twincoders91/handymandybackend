const { Router } = require("express");
const controller = require("../controller/jobs");

const router = Router();

router.get("/", controller.getJobs);
router.post("/", controller.createJob);
router.delete("/", controller.removeJobById);
router.delete("/ratings", controller.removeRatingByJobID);
router.put("/", controller.updateJobById);
router.get("/user/:id", controller.filterJobRequestsByUser);
router.get("/handyman/:id", controller.filterJobRequestsByHM);
router.get("/handyman-up/:id", controller.filterJobRequestByHMWithUserProfile);

module.exports = router;
