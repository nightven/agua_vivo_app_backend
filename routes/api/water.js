const express = require("express");
const validateBody = require("../../decorators/validateBody");
const router = express.Router();
const { schemas } = require("../../schemas/waterSchemas");
const controllers = require("../../controllers/waterController");

router.post(
  "/addwater",
  validateBody(schemas.waterSchemas),
  controllers.addWater
);

module.exports = router;
