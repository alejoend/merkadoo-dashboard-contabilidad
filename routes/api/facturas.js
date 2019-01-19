const express = require("express");
const router = express.Router();

//@route GET api/posts/test
//@description probar rutas de facturas
//@acceso: público
router.get("/test", (req, res) => res.json({ msg: "facturas funciona" }));

module.exports = router;
