const Book = require("../models/book.model");

const createBook = async (req, res) => {
    try {
        const { title, author, genre, year, description } = req.body;
        let photoUrl = "";

        if (req.file) {
            photoUrl = req.file.path; 
        }
        const book = new Book({ title, author, genre, year, description, photo: photoUrl });
        await book.save();

        res.status(201).json({ message: "Book created successfully", book });
    } catch (err) {
        res.status(500).json({ message: "Error creating book", error: err.message });
    }
};

const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: "Error fetching books", error: err.message });
    }
};

module.exports = { createBook, getBooks };