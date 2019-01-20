const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// traer modelo de usuario
const User = require("../../models/User");

//@route GET api/users/test
//@description probar rutas de usuarios
//@acceso: público
router.get("/test", (req, res) => res.json({ msg: "usuarios funciona" }));

//@route GET api/users/register
//@description registrar usuarios
//@acceso: público
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "emial ya existe" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: 200, // tamaño
        r: "pg", //rating
        d: "mm" //default
      });

      const newUser = new User({
        nombre: req.body.nombre,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route POST api/users/login
//@description login de usuario / devolver jwt token
//@acceso: público
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // encontrar usuario por el email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "usuario no encontrado" });
    }

    // verificar contraseña
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // usuario encontrado
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // crear payload jwt
        // crear sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              exito: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "contraseña incorrecta" });
      }
    });
  });
});

//@route GET api/users/current
//@description devuelve usuario actual
//@acceso: privado
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.nombre,
      email: req.user.email
    });
  }
);

module.exports = router;
