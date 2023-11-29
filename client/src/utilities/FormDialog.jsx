import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import BookForm from "../components/BookForm";

const FormDialog = ({ open, onClose, selectedBook, fetchBooks }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title"></DialogTitle>
      <DialogContent>
        <BookForm
          book={selectedBook}
          fetchBooks={fetchBooks}
          onClose={onClose}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
