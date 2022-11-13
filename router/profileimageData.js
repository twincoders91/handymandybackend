const { Router } = require("express");
const controller = require("../controller/profileimage");

const router = Router();

router.post("/", controller.createProfileImage);

module.exports = router;
