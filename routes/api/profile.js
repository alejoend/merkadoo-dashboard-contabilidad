const express = require("express");
const router = express.Router();

//@route GET api/profile/test
//@description probar rutas de perfil
//@acceso: público
router.get("/test", (req, res) => res.json({ msg: "perfil funciona" }));

module.exports = router;
