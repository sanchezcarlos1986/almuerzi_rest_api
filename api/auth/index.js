const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const colorLog = require("../../utils/colorLog");

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.sendStatus(403);

  jwt.verify(token, "mi-secreto", (err, decoded) => {
    if (err) res.send("no se pudo verificar el token");

    const { _id } = decoded;

    Users.findOne({ _id })
      .exec()
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => colorLog("error", err));
  });
};

module.exports = isAuthenticated;
