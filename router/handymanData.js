const { Router } = require("express");
const controller = require("../controller/handyman");

const router = Router();

router.get("/", controller.getHandyman);
router.get("/username/:username", controller.getHandymanByUsername);
router.get("/validate/:username", controller.validateUsername);
router.get("/validate/email/:email", controller.validateEmail);
router.post("/", controller.addHandyman);
router.get("/:id/ratings", controller.getAllRatingsForHMByIdAndStatus);
router.get("/:id/ratingssummary", controller.getHandymanRatingsSummary);
router.get("/:id", controller.getHandymanById);
router.put("/", controller.updateHandyman);
router.get(
  "/:id/averageratingandjobs",
  controller.getHandymanAverageRatingAndTotalJobs
);

module.exports = router;
