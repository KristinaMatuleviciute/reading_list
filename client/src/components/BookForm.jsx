import React, { useState, useEffect } from "react";
import axios from "axios";
//import './BookForm.css';

const BookForm = ({ handleIconPress, book, fetchBooks, onClose }) => {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    ISBN: "",
    status: "Unread",
    favorite: false,
  });

  useEffect(() => {
    setNewBook({
      title: book.title || "",
      author: book.author || "",
      ISBN: book.ISBN || "",
      status: book.status || "Unread",
      favorite: book.favorite || false,
    });
  }, [book]);

  const addBook = () => {
    console.log("newBook", newBook);
    axios
      .post("/api/books/", newBook)
      .then((response) => {
        fetchBooks();
        onClose();
        console.log(response.data);
      })
      .catch((error) => console.error("error : ", error));
  };

  const updateBook = () => {
    if (book._id) {
      axios
        .put(`/api/books/${book._id}`, newBook)
        .then((response) => {
          fetchBooks();
          onClose();
          console.log(response.data);
        })
        .catch((error) => console.error("error : ", error));
    }
  };

  return (
    <div className="book-form-container">
      <h2 className="book-form-header">{book._id ? "Update" : "Add"} a Book</h2>
      <div className="book-form">
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="form-input"
        />
        <input
          type="text"
          placeholder="ISBN"
          value={newBook.ISBN}
          onChange={(e) => setNewBook({ ...newBook, ISBN: e.target.value })}
          className="form-input"
        />
        <select
          value={newBook.status}
          onChange={(e) => setNewBook({ ...newBook, status: e.target.value })}
          className="form-input"
        >
          <option value="Unread">Unread</option>
          <option value="In Progress">In Progress</option>
          <option value="Finished">Finished</option>
        </select>

        {book._id && (
          <div className="form-checkbox">
            <label>
              Did you like the book?
              <input
                type="checkbox"
                checked={newBook.favorite}
                onChange={(e) =>
                  setNewBook({
                    ...newBook,
                    favorite: Boolean(e.target.checked),
                  })
                }
              />
            </label>
          </div>
        )}
        {book._id ? (
          <button onClick={updateBook} className="form-button">
            Update
          </button>
        ) : (
          <button onClick={addBook} className="form-button">
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default BookForm;
