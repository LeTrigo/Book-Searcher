// api/books.js - Endpoint serverless para Vercel
import axios from "axios";

// Función handler que Vercel ejecutará cuando se acceda a /api/books
export default async function handler(req, res) {
  const { q } = req.query; // Extrae el parámetro de búsqueda

  // Valida que exista un término de búsqueda
  if (!q) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  try {
    // URL de la API de Google Books (desde variables de entorno o valor por defecto)
    const GOOGLE_BOOKS_API_URL =
      process.env.GOOGLE_BOOKS_API_URL ||
      "https://www.googleapis.com/books/v1/volumes";

    // Realiza la petición a la API de Google Books
    const response = await axios.get(GOOGLE_BOOKS_API_URL, {
      params: { q },
    });
    res.status(200).json(response.data.items || []); // Devuelve los resultados
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Error fetching books" });
  }
}
