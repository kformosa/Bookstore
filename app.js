const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());

Genre = require("./models/genre");
Book = require("./models/book");

// Connect to Mongoose.
mongoose.connect("mongodb://localhost/bookstore");
const db = mongoose.connection;

app.get("/", function(req, res) {
  res.send("Please use /api/books or /api/genres");
});

app.get("/api/genres", function(req, res) {
  Genre.getGenres((err, genres) => {
    if (err) {
      throw err;
    }
    res.json(genres);
  });
});

app.post("/api/genres", function(req, res) {
  let genre = req.body;

  Genre.addGenre(genre, (err, genre) => {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.put("/api/genres/:_id", function(req, res) {
  let id = req.params._id;
  let genre = req.body;

  Genre.updateGenre(id, genre, {}, (err, genre) => {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.delete("/api/genres/:_id", function(req, res) {
  let id = req.params._id;

  Genre.deleteGenre(id, (err, genre) => {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.get("/api/books", function(req, res) {
  Book.getBooks((err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

app.get("/api/books/:_id", function(req, res) {
  Book.getBookById(req.params._id, (err, book) => {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.post("/api/books", function(req, res) {
  let book = req.body;

  Book.addBook(book, (err, book) => {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.put("/api/books/:_id", function(req, res) {
  let id = req.params._id;
  let book = req.body;

  Book.updateBook(id, book, {}, (err, book) => {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.delete("/api/books/:_id", function(req, res) {
  let id = req.params._id;

  Book.deleteBook(id, (err, book) => {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.listen(3000);
console.log("Running on port 3000...");
