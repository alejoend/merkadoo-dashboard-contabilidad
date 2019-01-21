const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//@route GET api/profile/test
//@description probar rutas de perfil
//@acceso: público
router.get("/test", (req, res) => res.json({ msg: "perfil funciona" }));

module.exports = router;
