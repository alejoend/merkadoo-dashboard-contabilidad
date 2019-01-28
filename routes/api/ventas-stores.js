const express = require("express");
const router = express.Router();
const passport = require("passport");

// cargar modelo de ventas
const VentaStore = require("../../models/VentaStore");

//@route POST api/ventas/register
//@description crear ventas
//@acceso: privado

router.post("/register", passport.authenticate("jwt", {session: false}), (req, res) => {
    const venta = new VentaStore({
        año: req.body.año,
        mes: req.body.mes,
        monto: req.body.monto,
        store: req.body.store
    })
    
    venta.save().then(venta => {
        res.json(venta);
    }).catch(err => console.log(err))
})
