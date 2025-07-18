// server.js - Punto de entrada del backend Express
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Carga variables de entorno

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Habilita CORS para permitir peticiones desde el frontend
app.use(bodyParser.json()); // Parsea solicitudes JSON

// Rutas - Conecta el endpoint /books con el controlador correspondiente
const bookRoutes = require("./routes/bookRoutes");
app.use("/books", bookRoutes);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
