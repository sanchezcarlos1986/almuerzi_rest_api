const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const colorLog = require("../utils/colorLog");
const meals = require("./routes/meals");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// const MONGO_URI =
//   "mongodb://almuerzi_master:Jqbg6Yh0uGOrhUV2@cluster0-shard-00-00.wo66i.mongodb.net:27017,cluster0-shard-00-01.wo66i.mongodb.net:27017,cluster0-shard-00-02.wo66i.mongodb.net:27017/almuerzi-db?ssl=true&replicaSet=atlas-1033u4-shard-0&authSource=admin&retryWrites=true&w=majority";

const uri = process.env.MONGO_URI || MONGO_URI;

const connectDB = async () => {
  setTimeout(() => {
    colorLog("warning", "1. connecting to the DB ....");
  }, 1000);

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    colorLog("success", "2. DB connected!");
  } catch (err) {
    colorLog("error", "3. ERROR connecting to the DB ===>: ", err);
  }
};

connectDB();

app.use("/api/meals", meals);

app.get("*", (req, res) => {
  res.send("<h1>Default response</h1>");
});

// app.listen(3000, () => colorLog("info", "0. Server running on port 3000"));

module.exports = app;
