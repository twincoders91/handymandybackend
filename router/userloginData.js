const { Router } = require("express");
const controller = require("../controller/userlogin");

const router = Router();

router.get("/signup", controller.signup);
router.post("/", controller.login);

module.exports = router;
