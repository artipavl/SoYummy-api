const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { updateController: controllers } = require("../../controllers");
const { authenticate, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/auth");

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

const router = express.Router();

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatars",
    allowed_formats: ["jpg", "png"],
    transformation: {
      width: 100,
      height: 100,
      crop: "thumb",
      gravity: "auto",
      zoom: 0.75,
    },
  },
});

const uploadCloud = multer({ storage });

router.patch(
  "/update-user",
  authenticate,
  uploadCloud.single("avatar"),
  validateBody(schemas.updateUserSchema),
  controllers.updateUser
);

module.exports = router;
