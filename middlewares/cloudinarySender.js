const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const uploadCloud = (cloudOptions) => {
  const { fieldname, destFolder, transformation } = cloudOptions;
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: destFolder,
      allowed_formats: ["jpg", "png"],
      transformation: transformation,
    },
  });

  const upload = multer({ storage });
  const result = upload.single(fieldname);

  return result;
};

module.exports = uploadCloud;
