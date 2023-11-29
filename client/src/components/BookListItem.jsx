import React from "react";
import axios from "axios";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import BookReading from "@mui/icons-material/LocalLibrary";
import BookNew from "@mui/icons-material/Book";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";

const BookListItem = ({ book, handleUpdate, handleDelete, fetchBooks }) => {
  const colorPink = pink[400];
  const labelId = `checkbox-list-secondary-label-${book.id}`;

  const handleIconPress = async () => {
    console.log("book id", book._id);
    try {
      await axios.put(`/api/books/${book._id}`, { favorite: !book.favorite });
      fetchBooks();
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <ListItem
      sx={{
        mb: { xs: 10, md: 3 },
      }}
      secondaryAction={
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "5px",
          }}
          className="fab-container"
        >
          <Fab
            size="small"
            aria-label="like"
            onClick={handleIconPress}
            style={{ color: book.favorite ? colorPink : "grey" }}
          >
            <FavoriteIcon />
          </Fab>
          <Fab size="small" aria-label="edit">
            <UpdateIcon onClick={handleUpdate} />
          </Fab>
          <Fab size="small" aria-label="add">
            <DeleteIcon onClick={handleDelete} />
          </Fab>
        </Box>
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemAvatar>
          {book.status === "In Progress" && (
            <Fab size="small" aria-label="add">
              <BookReading />
            </Fab>
          )}
          {book.status === "Unread" && (
            <Fab size="small" aria-label="add">
              <BookNew />
            </Fab>
          )}
          {book.status === "Finished" && (
            <Fab size="small" aria-label="add">
              <LibraryAddCheckIcon />
            </Fab>
          )}
        </ListItemAvatar>
        <ListItemText
          id={labelId}
          primary={book.title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {book.author}
              </Typography>
              &nbsp;-&nbsp;ISBN: {book.ISBN}
            </React.Fragment>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default BookListItem;
