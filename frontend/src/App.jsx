import { useState } from "react";

import "./App.css";
import axios from "axios"; // Import axios for making HTTP requests

function App() {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the input value
  const [books, setBooks] = useState([]); // State to store the list of books
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error messages
  const [expandedBooks, setExpandedBooks] = useState({});

  const handleSearch = async () => {
    setLoading(true); // Set loading to true when starting the search
    setError(null); // Reset any previous errors
    setBooks([]); // Clear previous search results

    if (!searchQuery.trim()) {
      setError("Please enter a search term.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/books", {
        params: { q: searchQuery }, // Pass the search query as a parameter
      });

      setBooks(response.data || []);
    } catch (err) {
      setError(err.message || "An error occurred while fetching books.");
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  const handleMouseMove = (e) => {
    const title = document.querySelector(".animated-title");
    const rect = title.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    title.style.setProperty("--mouse-x", `${x}%`);
    title.style.setProperty("--mouse-y", `${y}%`);
  };

  const toggleDescription = (id) => {
    setExpandedBooks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <h1 className="animated-title">Book Searcher</h1>
      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          id="search-input"
          className="form-field"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" type="submit">
          {/* SVG lupa */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#fff" strokeWidth="2" />
            <line
              x1="20"
              y1="20"
              x2="16.65"
              y2="16.65"
              stroke="#fff"
              strokeWidth="2"
            />
          </svg>
        </button>
      </form>

      {/* Loader */}
      {loading && <p>Loading...</p>}

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Displaying the list of books */}
      <div className="book-container">
        {books.map((book) => {
          const isTitleExpanded = expandedBooks[`${book.id}-title`];
          const isDescExpanded = expandedBooks[`${book.id}-desc`];
          const title = book.volumeInfo.title || "";
          const description = book.volumeInfo.description || "";

          return (
            <div
              className="book-card"
              key={book.id}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                card.style.setProperty("--mouse-x", `${x}%`);
                card.style.setProperty("--mouse-y", `${y}%`);
              }}
            >
              <div
                className={`book-title${isTitleExpanded ? " expanded" : ""}`}
              >
                {isTitleExpanded ? title : title.slice(0, 100)}
              </div>
              {title.length > 100 && (
                <span
                  className="show-more"
                  onClick={() =>
                    setExpandedBooks((prev) => ({
                      ...prev,
                      [`${book.id}-title`]: !isTitleExpanded,
                    }))
                  }
                >
                  {isTitleExpanded ? "Show less" : "Show more"}
                </span>
              )}

              <p>{book.volumeInfo.authors?.join(", ")}</p>

              {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                  className="book-image"
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={title}
                />
              )}

              <div
                className={`book-description${
                  isDescExpanded ? " expanded" : ""
                }`}
              >
                {isDescExpanded ? description : description.slice(0, 300)}
              </div>
              {description.length > 300 && (
                <span
                  className="show-more"
                  onClick={() =>
                    setExpandedBooks((prev) => ({
                      ...prev,
                      [`${book.id}-desc`]: !isDescExpanded,
                    }))
                  }
                >
                  {isDescExpanded ? "Show less" : "Show more"}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
