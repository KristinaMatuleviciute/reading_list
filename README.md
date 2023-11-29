# Reading List App

A simple web application to manage your reading list, built with Node.js, React, and MongoDB.

## Features

- View a list of books
- Add a new book to the reading list
- Update book details(author, title, or ISBN.)
- Update the status of a book (Unread, In Progress, Finished), when updating status, book item changes.
- Delete a book from the reading list
- Mark a book as a favorite (Favorite icon turns red)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- NPM or Yarn installed
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)).

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/reading-list-app.git
cd reading-list-app

```
### Navigate to the server directory and start server
cd client
npm start

### Navigate to the client directory and start application
cd client
npm start

Visit http://localhost:3000 to view the app.

![app](/client/src/images/booklistapp.png)

### Run tests 
```
    stop application
    cd server
    npm test
```
you should see output:

![tests](client/src/images/tests.png)

## Built With
- Node.js - Server-side JavaScript runtime
- Express - Web framework for Node.js
- React - JavaScript library for building user interfaces
- MongoDB - NoSQL database
- Mongoose - MongoDB object modeling for Node.js
  
## Authors
Kristina Matuleviciute

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.


