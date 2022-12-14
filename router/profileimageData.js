const { Router } = require("express");
const controller = require("../controller/profileimage");

const router = Router();

router.post("/", controller.createProfileImage);
router.put("/", controller.updateProfileImageTable);
router.put("/hm", controller.updateHMProfileImageTable);

module.exports = router;
