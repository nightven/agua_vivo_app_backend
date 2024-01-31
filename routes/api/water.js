const express = require("express");
const validateBody = require("../../decorators/validateBody");
const router = express.Router();
const { schemas } = require("../../schemas/waterSchemas");
const controllers = require("../../controllers/waterController");
const { authenticate, isValidId } = require("../../middlewares");

router.post(
  "/add",
  authenticate,
  validateBody(schemas.waterSchemas),
  controllers.addWater
);

router.put(
  "/update",
  authenticate,
  validateBody(schemas.updateWaterSchemas),
  controllers.updateWater
);

router.delete(
  "/delete",
  authenticate,
  validateBody(schemas.deleteWaterSchemas),
  controllers.deleteWater
);

router.get("/today", authenticate, controllers.getToDay);

router.get(
  "/month",
  authenticate,
  validateBody(schemas.monthlySchemas),
  controllers.getMonthly
);

module.exports = router;
