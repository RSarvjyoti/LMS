const { Router } = require("express");
const { signup, login, logout, getUserDetails, getAllUsers } = require("../controllers/user.controller");
const { upload } = require("../utils/cloudinary");
const { authMiddleware, authorizeAdmin } = require("../middilewares/auth");

const userRoute = Router();

userRoute.post('/signup', upload.single("photo"), signup);
userRoute.post('/login', login);
userRoute.get('/me', authMiddleware,  getUserDetails);
userRoute.post('/logout', logout);
userRoute.get('/get-all-users',authMiddleware, authorizeAdmin, getAllUsers);

module.exports = userRoute;
