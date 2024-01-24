const multer = require("multer");

const multerConfig = multer.diskStorage({});

const upload = multer({});

module.exports = upload;
