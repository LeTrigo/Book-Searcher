import { useState } from "react";
import bookImg from "./assets/book-img.png";
import "./App.css";
import axios from "axios"; // Importa axios para realizar peticiones HTTP

// Obtiene la URL de la API desde variables de entorno (para flexibilidad entre desarrollo/producción)
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  // Estados para gestionar la aplicación
  const [searchQuery, setSearchQuery] = useState(""); // Almacena el texto de búsqueda
  const [books, setBooks] = useState([]); // Almacena los libros obtenidos de la API
  const [loading, setLoading] = useState(false); // Controla el estado de carga
  const [error, setError] = useState(null); // Almacena mensajes de error
  const [expandedBooks, setExpandedBooks] = useState({}); // Controla qué descripciones están expandidas
  const [hasSearched, setHasSearched] = useState(false); // Indica si ya se realizó una búsqueda

  // Función para manejar la búsqueda de libros
  const handleSearch = async () => {
    setLoading(true); // Activa indicador de carga
    setError(null); // Reinicia errores previos
    setBooks([]); // Limpia resultados anteriores
    setHasSearched(true); // Marca que se realizó una búsqueda

    // Valida que la búsqueda no esté vacía
    if (!searchQuery.trim()) {
      setError("Please enter a search term.");
      setLoading(false);
      return;
    }

    try {
      // Realiza petición a la API con el término de búsqueda
      const response = await axios.get(API_URL, {
        params: { q: searchQuery },
      });

      setBooks(response.data || []); // Almacena los libros obtenidos
    } catch (err) {
      setError(err.message || "An error occurred while fetching books.");
    } finally {
      setLoading(false); // Desactiva indicador de carga
    }
  };

  // Función para manejar el efecto de animación del título según movimiento del mouse
  const handleMouseMove = (e) => {
    const title = document.querySelector(".animated-title");
    const rect = title.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    title.style.setProperty("--mouse-x", `${x}%`);
    title.style.setProperty("--mouse-y", `${y}%`);
  };

  // Función para expandir/colapsar descripciones y títulos
  const toggleDescription = (id) => {
    setExpandedBooks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Renderizado del componente
  return (
    <div onMouseMove={handleMouseMove}>
      {/* Icono flotante de libro con animación */}
      <div className="floating-book-icon">
        <img src={bookImg} alt="Libro flotante" width={48} height={48} />
      </div>

      {/* Título de la aplicación con animación */}
      <h1 className="animated-title">Book Searcher</h1>

      {/* Formulario de búsqueda */}
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
          placeholder="Search a book..."
        />
        <button className="search-button" type="submit">
          {/* SVG lupa - Icono de búsqueda */}
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

      {/* Indicador de carga */}
      {loading && <div className="loader"></div>}

      {/* Mensajes de error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Contenedor de resultados */}
      <div className="book-container">
        {/* Mensaje cuando no se encuentran libros */}
        {!loading && hasSearched && books.length === 0 && (
          <p style={{ color: "#fff", fontSize: "1.2rem", marginTop: "2rem" }}>
            Sorry, no books found.
          </p>
        )}

        {/* Mapeo de los libros encontrados */}
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
                // Efecto de seguimiento del cursor en las tarjetas
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                card.style.setProperty("--mouse-x", `${x}%`);
                card.style.setProperty("--mouse-y", `${y}%`);
              }}
            >
              {/* Título del libro con opción expandible */}
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

              {/* Autores del libro */}
              <p>{book.volumeInfo.authors?.join(", ")}</p>

              {/* Imagen del libro con enlace de compra si está disponible */}
              {book.volumeInfo.imageLinks?.thumbnail &&
                (book.saleInfo?.buyLink ? (
                  <a
                    href={book.saleInfo.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Comprar este libro"
                  >
                    <img
                      className="book-image"
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt={title}
                    />
                  </a>
                ) : (
                  <img
                    className="book-image"
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={title}
                  />
                ))}

              {/* Descripción del libro con opción expandible */}
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
