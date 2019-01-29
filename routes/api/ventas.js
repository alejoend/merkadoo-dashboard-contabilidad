const express = require("express");
const router = express.Router();
const passport = require("passport");

// cargar modelo de ventas
const Venta = require("../../models/Venta");

//@route GET api/ventas
//@description get ventas
//@acceso: privado
router.get("/test", passport.authenticate("jwt", {session: false}), (req, res) => {
    Venta.find()
    .then(ventas => {
        res.json(ventas);
    }).catch(err => console.log(err));
})

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

//@route DELETE api/ventas/:id
//@description borrar venta
//@acceso: privado

router.delete("/:ventaId", passport.authenticate("jwt", {session: false}), (req, res) => {
    const ventaId = req.params.ventaId;
    Venta.findByIdAndRemove(ventaId)
    .then(() => {
        console.log("VENTA DESTRUIDA");
        res.json({msg: "Venta destruida"})
    })
    .catch(err => console.log(err));
})
  
module.exports = router;
