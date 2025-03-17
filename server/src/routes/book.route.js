const {Router} = require("express");
const { createBook, getBooks, getBook, updateBook, deleteBook } = require("../controllers/book.controller");
const { authMiddleware, authorizeAdmin } = require("../middilewares/auth");
const { upload } = require("../utils/cloudinary");

const bookRoute = Router();

bookRoute.post('/create', authMiddleware, authorizeAdmin, upload.single("photo"), createBook);
bookRoute.get('/get', getBooks);
bookRoute.get('/get/:id', getBook);
bookRoute.put('/update-book/:id',authMiddleware, authorizeAdmin, upload.single("photo"), updateBook);
bookRoute.delete('/delete-book/:id',authMiddleware, authorizeAdmin, upload.single("photo"), deleteBook);


module.exports = bookRoute;