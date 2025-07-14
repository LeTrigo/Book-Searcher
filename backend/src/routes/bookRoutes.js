const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController")

// Route to search for books
router.get("/", bookController.searchBooks);

module.exports = router;
