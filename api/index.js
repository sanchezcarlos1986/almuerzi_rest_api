const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("../services/connectDB");
const meals = require("./routes/meals");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// Mongoose connection
connectDB();

// Routes
app.use("/api/meals", meals);

app.get("*", (req, res) => {
  res.send("<h1>Default response</h1>");
});

module.exports = app;
