const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 6000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const bookRoutes = require("./routes/bookRoutes");
app.use("/books", bookRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
