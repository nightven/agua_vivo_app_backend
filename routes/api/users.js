const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/userControllers");
const validateBody = require("../../decorators/validateBody");
const { schemas } = require("../../schemas/usersShemas");

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllers.register
);
router.post("/login");
router.get("/current");
router.post("/logout");

module.exports = router;
