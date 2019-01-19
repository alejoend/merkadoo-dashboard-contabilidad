const express = require("express");
const router = express.Router();

//@route GET api/users/test
//@description probar rutas de usuarios
//@acceso: público
router.get("/test", (req, res) => res.json({ msg: "usuarios funciona" }));

module.exports = router;
