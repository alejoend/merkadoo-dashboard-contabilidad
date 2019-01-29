const express = require("express");
const router = express.Router();
const passport = require("passport");

// cargar modelo de ventas
const Venta = require("../../models/Venta");

//@route POST api/ventas/register
//@description crear ventas
//@acceso: privado

router.post("/register", passport.authenticate("jwt", {session: false}), (req, res) => {
    const venta = new Venta({
        año: req.body.año,
        mes: req.body.mes,
        monto: req.body.monto,
        ordenes: req.body.ordenes,
        ordenesAnuladas: req.body.ordenesAnuladas
    })
    
    venta.save().then(venta => {
        res.json(venta);
    }).catch(err => console.log(err))
})

//@route GET api/ventas/:id
//@description get venta especiífica
//@acceso: privado
router.get("/:ventaId", passport.authenticate("jwt", {session: false}), (req, res) => {
    const ventaId = req.params.ventaId;
    Venta.findById(ventaId)
    .then(venta => {
        res.json(venta);
    }).catch(err => console.log(err))
})

module.exports = router;
