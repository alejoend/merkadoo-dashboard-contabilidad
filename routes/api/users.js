const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth");

//@route GET api/users/test
//@description probar rutas de usuarios
//@acceso: público
router.get("/test", (req, res) => res.json({ msg: "usuarios funciona" }));

//@route GET api/users/register
//@description render formulario de registro
//@acceso: público
router.get("/register", authController.getRegister);

//@route POST api/users/register
//@description registrar usuarios
//@acceso: público
router.post("/register", authController.postRegister);

//@route GET api/users/login
//@description render formulario de login
//@acceso: público
router.get("/login", authController.getLogin);

//@route POST api/users/login
//@description login de usuario / devolver jwt token
//@acceso: público
router.post("/login", authController.postLogin);

//@route GET api/users/current
//@description devuelve usuario actual
//@acceso: privado
router.get("/current", authController.getCurrent);

module.exports = router;
