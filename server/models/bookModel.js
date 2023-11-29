const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    ISBN: { type: String, required: false },
    title: { type: String, required: true },
    author: { type: String, required: true },
    favorite: { type: Boolean, required: false },
    status: {
      type: String,
      enum: ["Unread", "In Progress", "Finished"],
      default: "Unread",
    },
  },
  { collection: "bookcollection" }
);

bookSchema.statics.getBookList = async function () {
  return this.find();
};

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
