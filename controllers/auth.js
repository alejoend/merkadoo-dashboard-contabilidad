const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

// cargar validación de entrada
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// traer modelo de usuario
const User = require("../models/User");

//@route GET api/users/register
//@description render formulario de registro
//@acceso: público
exports.getRegister = (req, res, next) => {
  const errors = req.flash("errors");
  let messages = {
    invalidName: null,
    invalidEmail: null,
    invalidPwd: null,
    ivalidPwdConfirmation: null
  };
  if (errors.length > 0) {
    messages = {
      invalidName: errors[0].nombre,
      invalidEmail: errors[0].email,
      invalidPwd: errors[0].password,
      invalidPwdConfirmation: errors[0].password2
    };
  }
  res.render("auth/register", {
    pageTitle: "Registrar Usuario",
    path: "/api/users/register",
    messages: messages
  });
};

//@route POST api/users/register
//@description registrar usuarios
//@acceso: público
exports.postRegister = (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // validar entrada
  if (!isValid) {
    req.flash("errors", errors);
    return res.redirect("/api/users/register");
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email ya existe";
      req.flash("errors", errors);
      return res.redirect("/api/users/register");
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
              res.redirect("/api/users/login");
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
};

//@route GET api/users/login
//@description render formulario de login
//@acceso: público
exports.getLogin = (req, res, next) => {
  const errors = req.flash("errors");
  let messages = {
    invalidEmail: null,
    invalidPwd: null
  };
  if (errors.length > 0) {
    messages = {
      invalidEmail: errors[0].email,
      invalidPwd: errors[0].password
    };
  }

  res.render("auth/login", {
    pageTitle: "Login",
    path: "/api/users/login",
    messages: messages
  });
};

//@route POST api/users/login
//@description login de usuario / devolver jwt token
//@acceso: público
exports.postLogin = (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // validar entrada
  if (!isValid) {
    req.flash("errors", errors);
    return res.redirect("/api/users/register");
  }

  const email = req.body.email;
  const password = req.body.password;

  // encontrar usuario por el email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "Usuario no encontrado";
      req.flash("errors", errors);
      return res.redirect("/api/users/login");
    }

    // verificar contraseña
    bcrypt
      .compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          req.session.save(err => {
            console.log(err);
            res.redirect("/");
          });
        } else {
          errors.password = "Contraseña incorrecta";
          req.flash("errors", errors);
          return res.redirect("/api/users/login");
        }

        // usuario encontrado
        // const payload = { id: user.id, name: user.nombre, avatar: user.avatar }; // crear payload jwt

        // crear sign token
        /*jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json(token);
            req.session.isLoggedIn = true;
            res.redirect("/");
          }
        );*/
      })
      .catch(err => {
        console.log(err);
      });
  });
};

//@route POST api/users/logout
//@description logout usuario
//@acceso: privado
exports.postLogout = (req, res) => {
  req.session.destroy(err => {
    console.log("Error: ", err);
    res.redirect("/");
  });
};

//@route GET api/users/current
//@description devuelve usuario actual
//@acceso: privado
exports.getCurrent = (passport.authenticate("jwt", { session: false }),
(req, res, next) => {
  res
    .json({ id: req.user.id, name: req.user.nombre, email: req.user.email })
    .catch(err => {
      console.log(err);
    });
});
