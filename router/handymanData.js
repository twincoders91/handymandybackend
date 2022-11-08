const { Router } = require("express");
const controller = require("../controller/handyman");

const router = Router();

router.get("/", controller.getHandyman);
router.get("/username/:username", controller.getHandymanByUsername);
router.post("/", controller.addHandyman);
router.get("/:id/ratings", controller.getAllRatingsForHMByIdAndStatus);
router.get("/:id/ratingssummary", controller.getHandymanRatingsSummary);
router.get("/:id", controller.getHandymanById);
router.put("/", controller.updateHandyman);

module.exports = router;
