import { useState } from "react";

import "./App.css";
import axios from "axios"; // Import axios for making HTTP requests

function App() {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the input value
  const [books, setBooks] = useState([]); // State to store the list of books
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error messages

  const handleSearch = async () => {
    setLoading(true); // Set loading to true when starting the search
    setError(null); // Reset any previous errors
    setBooks([]); // Clear previous search results

    try {
      const response = await axios.get("http://localhost:6000/books", {
        params: { q: searchQuery }, // Pass the search query as a parameter
      });

      // Update the books state with the response data
      setBooks(response.data.items || []);
    } catch (err) {
      // Handle errors and update the error state
      setError(err.message || "An error occurred while fetching books.");
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  return (
    <>
      <h1>Book Searcher</h1>
      <form>
        <input //Input to enter the search term
          className="form-field"
          type="text"
          value={searchQuery} // The value of the input is linked to the status
          onChange={(e) => setSearchQuery(e.target.value)} // Update status when typing
        />{" "}
        <button
          className="search-button"
          type="button"
          onClick={handleSearch} // Action on click Search (Calling backend)
        >
          Search
        </button>
      </form>

      {/* Loader */}
      {loading && <p>Loading...</p>}

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Displaying the list of books */}
      <div>
        {books.map((book) => {
          <div className="book-card" key={book.id}>
            <h2>{book.volumeInfo.tittle}</h2>
            <p>{book.volumeInfo.authors?.join(", ")}</p>
            {book.volumeInfo.imageLinks?.thumbnail && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
            )}
            <p>{book.volumeInfo.description}</p>
          </div>;
        })}
      </div>
    </>
  );
}

export default App;
