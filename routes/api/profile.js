const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// cargar validador de entrada de perfil
const validateProfileInput = require("../../validation/profile");

// cargar perfil
const Profile = require("../../models/Profile");
// cargar usuario
const User = require("../../models/User");

//@route GET api/profile/test
//@description probar rutas de perfil
//@acceso: público
router.get("/test", (req, res) => res.json({ msg: "perfil funciona" }));

//@route GET api/profile
//@description perfil del usuario actual
//@acceso: privado

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noProfile = "No hay perfil para este usuario";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route POST api/profile
//@description crear perfil
//@acceso: privado

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // verificar
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // campos de perfil
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.bio) profileFields.bio = req.body.bio;

    if (typeof req.body.contacto !== "undefined") {
      profileFields.contacto = req.body.contacto.split(",");
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // actualizar
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // crear

        // verificar si existe el handle
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "El handle ya existe";
            res.status(400).json(errors);
          }

          // guardar perfil
          new Profile(profileFields)
            .save()
            .then(profile => res.json(profile))
            .catch(err => res.status(400).json(err));
        });
      }
    });
  }
);
module.exports = router;
