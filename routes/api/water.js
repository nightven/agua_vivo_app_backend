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

router.post(
  "/update",
  authenticate,
  validateBody(schemas.updateWaterSchemas),
  controllers.updateWater
);

router.delete("/:id", authenticate, isValidId, controllers.deleteWater);

router.get("/amountdaily", authenticate, controllers.getAmountDaily);

module.exports = router;
