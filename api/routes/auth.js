const express = require("express");
const crypto = require("crypto");
const Users = require("../models/Users");

const colorLog = require("../../utils/colorLog");

const router = express.Router();

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  crypto.randomBytes(16, (err, salt) => {
    const newSalt = salt.toString("base64");

    // crypto.pbkdf2(password, salt, iterations, keylen, digest, callback);
    crypto.pbkdf2(password, newSalt, 10000, 64, "sha1", (err, key) => {
      const encryptedPassword = key.toString("base64");

      Users.findOne({ email })
        .exec()
        .then((user) => {
          if (user) return res.send("usuario ya existe");

          Users.create({
            email,
            password: encryptedPassword,
            salt: newSalt,
          })
            .then(() => res.send("usuario creado con éxito"))
            .catch((err) =>
              colorLog("error", "error al crear al usuario", err)
            );
        });
    });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ email })
    .exec()
    .then((user) => {
      if (!user) return res.send("usuario no encontrado");

      crypto.pbkdf2(password, user.salt, 10000, 64, "sha1", (err, key) => {
        const encryptedPassword = key.toString("base64");

        if (user.password === encryptedPassword) {
          const token = signToken(user._id);
          return res.send({ token });
        } else {
          return res.send("contraseña incorrecta");
        }
      });
    });
});

module.exports = router;
