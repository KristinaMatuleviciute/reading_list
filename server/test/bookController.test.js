const request = require("supertest");
const express = require("express");
const app = express();
const bookController = require("../controllers/bookController");
const Book = require("../models/bookModel");

jest.mock("../models/bookModel");

app.get("/api/books", bookController.getReadingList);
app.get("/api/books/:id", bookController.getBookById);
app.post("/api/books", bookController.addBook);
app.put("/api/books/:id", bookController.updateBook);
app.delete("/api/books/:id", bookController.deleteBook);

describe("Book Controller Tests", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("GET /api/books should return a list of books", async () => {
    const mockBooks = [
      { title: "Book 1", author: "Author 1" },
      { title: "Book 2", author: "Author 2" },
    ];
    Book.find.mockResolvedValue(mockBooks);

    const response = await request(app).get("/api/books");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockBooks);
  });

  it("GET /api/books/:id should return a single book", async () => {
    const mockBook = { title: "Book 1", author: "Author 1" };
    Book.findById.mockResolvedValue(mockBook);

    const response = await request(app).get("/api/books/123");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockBook);
  });

  it("POST /api/books should add a new book", async () => {
    const newBook = { title: "New Book", author: "New Author" };
    Book.create.mockResolvedValue(newBook);

    const response = await request(app)
      .post("/api/books")
      .send(newBook)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(newBook);
  });

  it("PUT /api/books/:id should update a book", async () => {
    const updatedBook = { title: "Updated Book", author: "Updated Author" };
    Book.findByIdAndUpdate.mockResolvedValue(updatedBook);

    const response = await request(app)
      .put("/api/books/123")
      .send(updatedBook)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedBook);
  });

  it("DELETE /api/books/:id should delete a book", async () => {
    const deletedBook = { title: "Deleted Book", author: "Deleted Author" };
    Book.findByIdAndDelete.mockResolvedValue(deletedBook);

    const response = await request(app).delete("/api/books/123");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(deletedBook);
  });
});
