// bookService.js - Servicio que interactúa con la API de Google Books
const axios = require("axios");
const GOOGLE_BOOKS_API_URL =
  process.env.GOOGLE_BOOKS_API_URL ||
  "https://www.googleapis.com/books/v1/volumes";

// Función para buscar libros en la API de Google
const fetchBooks = async (query) => {
  try {
    // Realiza la petición a la API de Google Books
    const response = await axios.get(GOOGLE_BOOKS_API_URL, {
      params: { q: query },
    });
    return response.data.items || []; // Devuelve los items o un array vacío
  } catch (error) {
    console.error("Error fetching books from Google Books API:", error);
    throw error; // Propaga el error para manejarlo en el controlador
  }
};

module.exports = { fetchBooks };
