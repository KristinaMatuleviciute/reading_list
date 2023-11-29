const Book = require("../models/bookModel");

const bookController = {
  getReadingList: async (req, res) => {
    try {
      const readingList = await Book.find();
      res.json(readingList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getBookById: async (req, res) => {
    const { id } = req.params;
    try {
      const book = await Book.findById(id);

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.json(book);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addBook: async (req, res) => {
    try {
      const newBook = await Book.create(req.body);
      res.json(newBook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateBook: async (req, res) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.json(updatedBook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteBook: async (req, res) => {
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.id);
      res.json(deletedBook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = bookController;
