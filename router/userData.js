const { Router } = require("express");
const controller = require("../controller/user");

const router = Router();

router.get("/", controller.getUser);
router.post("/", controller.addUser);
router.get("/validate/:username", controller.validateUsername);
router.get("/validate/email/:email", controller.validateEmail);
router.get("/:id", controller.getUserById);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.removeUser);
router.post("/ratings", controller.createUserRatings);

module.exports = router;
