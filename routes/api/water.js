const express = require("express");
const validateBody = require("../../decorators/validateBody");
const router = express.Router();
const { schemas } = require("../../schemas/waterSchemas");
const controllers = require("../../controllers/waterController");
const { authenticate, isValidId, isValidMonth } = require("../../middlewares");

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
  "/delete/:waterId",
  authenticate,
  isValidId,
  controllers.deleteWater
);

router.get("/today", authenticate, controllers.getToDay);

router.get("/month/:date", authenticate, isValidMonth, controllers.getMonthly);

module.exports = router;
