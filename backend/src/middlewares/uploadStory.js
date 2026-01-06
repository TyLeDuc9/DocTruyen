const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "story",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const uploadStory = multer({ storage });
module.exports = uploadStory;
