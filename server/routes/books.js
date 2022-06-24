// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the book model
let book = require("../models/books");

/* GET books List page. READ */
router.get("/", (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("books/index", {
        title: "Books",
        books: books,
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  res.render("./books/addbook", {
    title: "Books",
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

  book.insertMany(
    {
      Title: req.body.title,
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre,
    },
    function (err, resl) {
      res.redirect("/books/");
    }
  );
});

// GET the Book Details page in order to edit an existing Book
router.get("/update/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

  book.find(
    { _id: new mongoose.Types.ObjectId(req.params.id) },
    function (err, books) {
      if (err) throw err;
      console.log(books);
      console.log(req.params.id);


      res.render("books/details", {
        title: "book Update ",
        books: books,
      });
    }
  );
});

// POST - process the information passed from the details form and update the document
router.post("/update/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  book.updateOne(
    { _id: new mongoose.Types.ObjectId(req.params.id) },
    {
      Title: req.body.title,
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre,
    },
    function (err, result) {
      if (err) throw err;

      res.redirect("/books/");
    }
  );
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  book.deleteOne({ _id: req.params.id }, function (err, resl) {
   //
    res.redirect("/books/");
  });
});

module.exports = router;
