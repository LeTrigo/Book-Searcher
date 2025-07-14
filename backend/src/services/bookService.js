const axios = require("axios");
const GOOGLE_BOOKS_API_URL =
  process.env.GOOGLE_BOOKS_API_URL ||
  "https://www.googleapis.com/books/v1/volumes";

const fetchBooks = async (query) => {
  try {
    const response = await axios.get(GOOGLE_BOOKS_API_URL, {
      params: { q: query },
    });
    return response.data.items || [];
  } catch (error) {
    console.error("Error fetching books from Google Books API:", error);
    throw error;
  }
};

module.exports = { fetchBooks };
