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

router.delete("/delete/:id", authenticate, isValidId, controllers.deleteWater);

router.get(
  "/amountdaily",
  authenticate,
  validateBody(schemas.dailySchemas),
  controllers.getAmountDaily
);

router.get(
  "/amoutmonth",
  authenticate,
  validateBody(schemas.monthlySchemas),
  controllers.getAmountMonthly
);

module.exports = router;
