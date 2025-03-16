const {Router} = require("express");
const { createBook, getBooks } = require("../controllers/book.controller");
const { authMiddleware, authorizeAdmin } = require("../middilewares/auth");
const { upload } = require("../utils/cloudinary");

const bookRoute = Router();

bookRoute.post('/create', authMiddleware, authorizeAdmin, upload.single("photo"), createBook);
bookRoute.get('/get', getBooks);

module.exports = bookRoute;