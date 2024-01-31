const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/userControllers");
const validateBody = require("../../decorators/validateBody");
const { schemas } = require("../../schemas/usersSchemas");
const { authenticate, upload, isEmptyBody } = require("../../middlewares");

//! UserInfo
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllers.updateAvatar
);
router.get("/info", authenticate, controllers.getInfo);
router.patch(
  "/update-user",
  authenticate,
  isEmptyBody,
  validateBody(schemas.updateSchema),
  controllers.updateInfo
);
router.patch(
  "/water-rate",
  authenticate,
  isEmptyBody,
  validateBody(schemas.waterRateSchema),
  controllers.dailyNorm
);

module.exports = router;
