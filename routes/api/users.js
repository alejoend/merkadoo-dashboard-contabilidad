const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth");
const autenticar = require("../../middleware/autenticar");

router.get("/test", (req, res) => res.json({ msg: "usuarios funciona" }));

router.get("/register", authController.getRegister);

router.post("/register", authController.postRegister);

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.post("/logout", autenticar, authController.postLogout);

router.get("/current", autenticar, authController.getCurrent);

module.exports = router;
