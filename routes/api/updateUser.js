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
    allowedFormats: ["jpg", "png"],
    // filename: (req, file, cb) => {
    //   cb(null, file.originalname);
    // },
  },
});

const uploadCloud = multer({ storage });

router.patch(
  "/update-user",
  authenticate,
  validateBody(schemas.updateUserSchema),
  uploadCloud.single("avatar"),
  controllers.updateUser
);

module.exports = router;
