const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const colorLog = require("../../utils/colorLog");

const isAuthenticated = (req, res, next) => {
  colorLog("info", "isAuthenticated: req:", req.headers);
  const token = req.headers.authorization;

  colorLog("info", "isAuthenticated: token:", token);

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

const hasRoles = (roles) => (req, res, next) => {
  colorLog("info", "isAuthenticated: roles:", {
    roles,
    userRole: req.user.role,
  });
  if (roles.includes(req.user.role)) return next();

  res.sendStatus(403);
};

module.exports = {
  isAuthenticated,
  hasRoles,
};
