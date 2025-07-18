const bookService = require("../services/bookService");

const searchBooks = async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).send("Query parameter 'q' is required");
  }

  try {
    // console.log("Search query received:", query);
    const books = await bookService.fetchBooks(query);
    // console.log("Books fetched:", books);
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Error fetching books");
  }
};

module.exports = { searchBooks };
