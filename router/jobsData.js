const { Router } = require("express");
const controller = require("../controller/jobs");

const router = Router();

router.get("/", controller.getJobs);
router.post("/", controller.createJob);
router.delete("/", controller.removeJobById);
router.put("/", controller.updateJobById);
router.get("/user/:id", controller.filterJobRequestsByUser);

module.exports = router;
