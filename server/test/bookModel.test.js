require("dotenv").config();
const mongoose = require("mongoose");
const { app, server } = require("../index");
const Book = require("../models/bookModel");

afterAll(async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  await mongoose.connection.close();
});

jest.mock("../models/bookModel", () => ({
  create: jest.fn(),
}));

describe("Book Model Tests", () => {
  it("should be able to create a new book", async () => {
    Book.create.mockResolvedValue({
      title: "Test Book",
      author: "Test Author",
    });

    const bookData = {
      title: "Test Book",
      author: "Test Author",
    };

    const newBook = await Book.create(bookData);
    expect(newBook.title).toBe("Test Book");
    expect(newBook.author).toBe("Test Author");
  });
});
