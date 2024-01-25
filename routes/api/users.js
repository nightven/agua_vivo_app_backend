const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/userControllers");
const validateBody = require("../../decorators/validateBody");
const { schemas } = require("../../schemas/usersSchemas");
const { authenticate, upload } = require("../../middlewares");

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

module.exports = router;
