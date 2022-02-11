// packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const cheatSheetRoutes = require("./routes/cheatSheetRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();

// database connection
mongoose
  .connect("mongodb://localhost/quick-code")
  .then(() => console.log("Connection established to database"))
  .catch(() => console.log("Connection failed to connect to database"));

// middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/cheatsheet", cheatSheetRoutes);

// running the server
app.listen(PORT, () => console.log("listening on port " + PORT));
