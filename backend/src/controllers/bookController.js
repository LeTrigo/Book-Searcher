// bookController.js - Controlador para la API de libros
const bookService = require("../services/bookService");

const searchBooks = async (req, res) => {
  const query = req.query.q; // Extrae el parámetro de búsqueda

  // Valida que exista un término de búsqueda
  if (!query) {
    return res.status(400).send("Query parameter 'q' is required");
  }

  try {
    // Llama al servicio para buscar libros
    const books = await bookService.fetchBooks(query);
    res.json(books); // Devuelve los resultados como JSON
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Error fetching books");
  }
};

module.exports = { searchBooks };
