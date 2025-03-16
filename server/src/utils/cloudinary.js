const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "uploads"; 
    let format = "auto"; 

    if (file.fieldname === "photo") {
      folder = "user_photos";
      format = "png";
    }

    return {
      folder,
      format,
      resource_type: "auto",
    };
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };