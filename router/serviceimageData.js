const { Router } = require("express");
const controller = require("../controller/serviceimage");

const router = Router();

router.post("/", controller.createServiceImage);

module.exports = router;
