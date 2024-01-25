const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/userControllers");
const validateBody = require("../../decorators/validateBody");
const { schemas } = require("../../schemas/usersSchemas");
const { authenticate } = require("../../middlewares");

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllers.register
);
router.post("/login", validateBody(schemas.loginSchema), controllers.login);
router.get("/current", authenticate, controllers.current);
router.post("/logout", authenticate);

module.exports = router;
