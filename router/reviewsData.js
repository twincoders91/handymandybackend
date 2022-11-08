const { Router } = require("express");
const controller = require("../controller/reviews");

const router = Router();

router.get("/", controller.getReviews);

module.exports = router;
