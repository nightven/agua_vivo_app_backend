const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/userControllers");
const validateBody = require("../../decorators/validateBody");
const { schemas } = require("../../schemas/usersSchemas");
const { authenticate, upload, isValidId } = require("../../middlewares");

//! Auth
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllers.register
);
router.post("/login", validateBody(schemas.loginSchema), controllers.login);
router.get("/current", authenticate, controllers.current);
router.post("/logout", authenticate, controllers.logout);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllers.updateAvatar
);

//! UserInfo
router.get("/:id", authenticate, isValidId, controllers.getInfo);
router.patch(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.updateSchema),
  controllers.updateInfo
);
router.put(
  "/water-rate/:id",
  authenticate,
  isValidId,
  validateBody(schemas.waterRateSchema),
  controllers.dailyNorm
);

module.exports = router;
