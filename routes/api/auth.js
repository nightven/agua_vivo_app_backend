const express = require("express");
const validateBody = require("../../decorators/validateBody");
const router = express.Router();
const { authenticate } = require("../../middlewares");
const { schemas } = require("../../schemas/authSchema");

const controllers = require("../../controllers/authController");

//! Auth
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllers.register
);
router.post("/login", validateBody(schemas.loginSchema), controllers.login);
router.get("/current", authenticate, controllers.current);
router.post("/logout", authenticate, controllers.logout);

//! Verify Email
router.get("/verify/:verificationToken", controllers.verifyEmail);
router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  controllers.resendVerifyEmail
);

//! Forgot Password
router.post(
  "/forgot-password",
  validateBody(schemas.emailSchema),
  controllers.forgotPassword
);
router.patch(
  "/reset-password",
  validateBody(schemas.resetPassword),
  authenticate,
  controllers.resetPassword
);

module.exports = router;
