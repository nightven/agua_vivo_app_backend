const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const { _id } = req.user;
    let folder = "avatars";
    return {
      folder: folder,
      allowed_formats: ["jpg", "png", "webp"],
      public_id: _id,
      transformation: [
        { width: 350, height: 350 },
        { width: 700, height: 700 },
      ],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
