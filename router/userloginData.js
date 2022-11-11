const { Router } = require("express");
const controller = require("../controller/userlogin");

const router = Router();

router.put("/signup", controller.signup);
router.post("/", controller.login);

module.exports = router;
