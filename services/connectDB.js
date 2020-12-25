const mongoose = require("mongoose");
const colorLog = require("../utils/colorLog");

const connectDB = (type, msg, ...rest) => {
  // Mongoose connection
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  mongoose.connection.on("connecting", () =>
    colorLog("warning", "1. connecting to the DB ....")
  );
  mongoose.connection.on("connected", () =>
    colorLog("success", "2. DB connected!")
  );
  mongoose.connection.on("error", (err) =>
    colorLog("error", "3. ERROR connecting to the DB ===>: ", err)
  );
};

module.exports = connectDB;
