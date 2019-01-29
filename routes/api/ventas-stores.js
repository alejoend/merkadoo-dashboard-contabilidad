const express = require("express");
const router = express.Router();
const passport = require("passport");

// cargar modelo de ventas
const VentaStore = require("../../models/VentaStore");

//@route GET api/ventas-stores
//@description get ventas-stores
//@acceso: privado
router.get("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    VentaStore.find()
    .then(ventasStores => {
        res.json(ventasStores);
    }).catch(err => console.log(err));
})

//@route POST api/ventas-stores/register
//@description crear ventas-stores
//@acceso: privado

router.post("/register", passport.authenticate("jwt", {session: false}), (req, res) => {
    const ventaStore = new VentaStore({
        año: req.body.año,
        mes: req.body.mes,
        store: req.body.store
    })
    
    ventaStore.save().then(ventaStore => {
        res.json(ventaStore);
    }).catch(err => console.log(err))
})

//@route GET api/ventas-stores/:id
//@description get venta-store especiífica
//@acceso: privado
router.get("/:ventaStoreId", passport.authenticate("jwt", {session: false}), (req, res) => {
    const ventaStoreId = req.params.ventaStoreId;
    VentaStore.findById(ventaStoreId)
    .then(venta => {
        res.json(venta);
    }).catch(err => console.log(err))
})

//@route DELETE api/ventas-stores/:id
//@description borrar venta-store
//@acceso: privado

router.delete("/:ventaStoreId", passport.authenticate("jwt", {session: false}), (req, res) => {
    const ventaStoreId = req.params.ventaStoreId;
    VentaStore.findByIdAndRemove(ventaStoreId)
    .then(() => {
        console.log("VENTA-STORE DESTRUIDA");
        res.json({msg: "Venta-Store destruida"})
    })
    .catch(err => console.log(err));
})

module.exports = router;
