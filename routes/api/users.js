const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// cargar validación de entrada
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// cargar model de usuario
const User = require("../../models/User");

router.post("/register", (req, res) => {
  console.log("en /api/users/register");
  const { erros, isValid } = validateRegisterInput(req.body);

  // verificar datos de usuario
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email ya existe" });
    }
  });

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  // hashear la contraseña antes de guardar en base de datos
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    });
  });
});

router.post("/login", (req, res) => {
  // validación de formulario
  const { errors, isValid } = validateLoginInput(req.body);

  // validar
  if (!isValid) {
    return res.status.json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // encontar usuario por email
  User.findOne({ email }).then(user => {
    // verificar si existe usuario
    if (!user) {
      return res.status(404).json({ emailNotFound: "Email not found" });
    }
  });

  // verificar contraseña
  bcrypt.compare(password, user.password).then(isMatch => {
    if (isMatch) {
      // usuario encontrado
      // crear json web token
      const payload = {
        id: user.id,
        name: user.name
      };
      // sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 31556926 // 1 año en segundos
        },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    } else {
      return res.status(400).json({ passwordIncorrect: "Password incorrect" });
    }
  });
});

module.exports = router;
