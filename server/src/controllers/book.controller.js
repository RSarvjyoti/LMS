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

const getBook = async (req, res) => {
    try {
        const { id } = req.params; 
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: "Error fetching book", error: err.message });
    }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (req.file) {
            updates.photo = req.file.path; 
        }

        const book = await Book.findByIdAndUpdate(id, updates, { new: true });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book updated successfully", book });
    } catch (err) {
        res.status(500).json({ message: "Error updating book", error: err.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting book", error: err.message });
    }
};

module.exports = { createBook, getBooks, getBook, updateBook, deleteBook };