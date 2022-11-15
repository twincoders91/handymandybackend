const { Router } = require("express");
const controller = require("../controller/services");

const router = Router();

router.get("/", controller.getServices);
router.post("/", controller.addServices);
router.get("/totaljobs", controller.filterCountTotalJobs);
router.get("/:id", controller.getServiceInfo);
router.get("/handyman/:id", controller.getServicesByHMId);
router.get("/category/:category", controller.filterServicesByCategory);
router.delete("/", controller.removeServicesById);
router.put("/inactive", controller.updateServiceActiveById);
router.put("/", controller.updateServicesById);

module.exports = router;
