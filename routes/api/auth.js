const express = require("express");
const validateBody = require("../../decorators/validateBody");
const router = express.Router();
const { authenticate } = require("../../middlewares");
const { schemas } = require("../../schemas/authSchema");

const controllers = require("../../controllers/authController");

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllers.register
);
router.post("/login", validateBody(schemas.loginSchema), controllers.login);
router.get("/current", authenticate, controllers.current);
router.post("/logout", authenticate, controllers.logout);

router.get("/verify/:verificationToken", controllers.verifyEmail);
router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  controllers.resendVerifyEmail
);

module.exports = router;
