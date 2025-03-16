const { Router } = require("express");
const { signup, login } = require("../controllers/user.controller");
const { upload } = require("../utils/cloudinary");

const userRoute = Router();

userRoute.post('/signup', upload.fields([{ name: "photo", maxCount: 1 }]), signup);
userRoute.post('/login', login);

module.exports = userRoute;
