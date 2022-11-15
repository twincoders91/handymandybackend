const { Router } = require("express");
const controller = require("../controller/inbox");

const router = Router();

router.post("/", controller.createMessage);
router.get("/:jobs_id", controller.filterMessageByJobId);

module.exports = router;
