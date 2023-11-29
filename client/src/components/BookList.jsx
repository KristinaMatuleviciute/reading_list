import React, { useEffect, useState } from "react";
import axios from "axios";
import BookListItem from "./BookListItem";
import "../styles/BookList.css";
import FormDialog from "../utilities/FormDialog";
import List from "@mui/material/List";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { green } from "@mui/material/colors";
const colorGreen = green[400];

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [newbookId, setBookId] = useState("");
  const [selectedBook, setSelectedBook] = useState({
    title: "",
    author: "",
    ISBN: "",
    status: "Unread",
    favorite: false,
  });
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios
      .get("/api/books")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
        console.log("books", response.data);
        setSelectedBook({
          title: "",
          author: "",
          ISBN: "",
          status: "Unread",
          favorite: false,
        });
      })
      .catch((error) => console.error(error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const getBook = (bookId) => {
    axios
      .get(`/api/books/${bookId}`)
      .then((response) => {
        console.log(`Book details for ID ${bookId}:`, response.data);
        setSelectedBook(response.data);
      })
      .catch((error) =>
        console.error(`Error fetching book details for ID ${bookId}:`, error)
      );
  };

  const handleUpdate = (bookId) => {
    getBook(bookId);
    console.log(`Updating book with ID: ${bookId}`);
    setOpen(true);
    setSelectedBook({
      title: "",
      author: "",
      ISBN: "",
      status: "Unread",
      favorite: false,
    });
  };

  const handleDelete = (id) => {
    setBookId(id);
    handleOpenDialog();
  };

  const confirmDelete = () => {
    //console.log("id", newbookId);
    axios
      .delete(`/api/books/${newbookId}`)
      .then((response) => {
        console.log(response.data);
        fetchBooks();
      })
      .catch((error) => console.error(error));

    handleCloseDialog();
  };

  return (
    <div className="book-list-container">
      <React.Fragment>
        <div className="titleZen">
          <h1>BookZen</h1>
        </div>
        <div className="add-button">
          <Fab style={{ backgroundColor: colorGreen }} aria-label="add">
            <AddIcon onClick={handleClickOpen} />
          </Fab>
        </div>
        <FormDialog
          open={open}
          onClose={handleClose}
          selectedBook={selectedBook}
          fetchBooks={fetchBooks}
        />
      </React.Fragment>
      <div className="books">
        <List
          dense
          sx={{
            width: "100%",
            maxWidth: 800,
            bgcolor: "background.paper",
          }}
        >
          {books.map((book) => (
            <BookListItem
              key={book._id}
              book={book}
              fetchBooks={fetchBooks}
              handleUpdate={() => handleUpdate(book._id)}
              handleDelete={() => handleDelete(book._id)}
            />
          ))}
        </List>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={() => confirmDelete(newbookId)} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default BookList;
