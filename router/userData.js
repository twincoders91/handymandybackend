const { Router } = require("express");
const controller = require("../controller/user");
const auth = require("../middleware/auth");
const multer = require("multer");

//================================Multer============================
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  //   limits: { fieldSize: 10 * 1024 * 1024 },
});

//===========================================================================

const router = Router();

router.get("/character/:username", controller.checkCharacterUser);
router.get("/", controller.getUser);
router.get("/:username/id", controller.getUserID);
router.post("/", controller.addUser);
router.get("/validate/:username", controller.validateUsername);
router.get("/validate/email/:email", controller.validateEmail);
router.get("/:id", controller.getUserById);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.removeUser);
router.post("/ratings", controller.createUserRatings);
router.get("/:id/ratingssummary", controller.getUserAverageRatingAndTotalJobs);
router.post(
  "/profileimage",
  upload.single("image"),
  controller.uploadUserProfileImage
);

module.exports = router;
