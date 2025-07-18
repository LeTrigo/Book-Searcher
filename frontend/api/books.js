import axios from "axios";

export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  try {
    const GOOGLE_BOOKS_API_URL =
      process.env.GOOGLE_BOOKS_API_URL ||
      "https://www.googleapis.com/books/v1/volumes";

    const response = await axios.get(GOOGLE_BOOKS_API_URL, {
      params: { q },
    });
    res.status(200).json(response.data.items || []);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Error fetching books" });
  }
}
