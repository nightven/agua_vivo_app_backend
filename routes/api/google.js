const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/googleController");

router.get("/google", controllers.googleAuth);
router.get("/google-redirect", controllers.googleRedirect);

module.exports = router;
