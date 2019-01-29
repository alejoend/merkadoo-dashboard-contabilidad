const express = require("express");
const router = express.Router();
const passport = require("passport");

// cargar modelo de ventas
const VentaStore = require("../../models/VentaStore");

// cargar validacion de venta
const validateVentaStoreInput = require("../../validation/venta-store");

//@route GET api/ventas-stores
//@description GET TODAS ventas-stores
//@acceso: privado

router.get("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    VentaStore.find()
    .then(ventasStores => {
        res.json(ventasStores);
    }).catch(err => console.log(err));
})

//@route POST api/ventas-stores/register
//@description CREAR ventas-stores
//@acceso: privado

router.post("/register", passport.authenticate("jwt", {session: false}), (req, res) => {
    const { errors, isValid } = validateVentaStoreInput(req.body);

  // validar entrada
  if (!isValid) {
    return res.status(400).json(errors);
  }
    const ventaStore = new VentaStore({
        año: req.body.año,
        mes: req.body.mes,
        store: {
            id: req.body.store,
            ordenes: req.body.ordenes.split(","),
            ordenesAnuladas: req.body.ordenesAnuladas.split(","),
            monto: req.body.monto
        }
    })
    
    ventaStore.save().then(ventaStore => {
        res.json(ventaStore);
    }).catch(err => console.log(err))
})

//@route GET api/ventas-stores/:id
//@description GET venta-store especiífica
//@acceso: privado

router.get("/:ventaStoreId", passport.authenticate("jwt", {session: false}), (req, res) => {
    const ventaStoreId = req.params.ventaStoreId;
    VentaStore.findById(ventaStoreId)
    .then(venta => {
        res.json(venta);
    }).catch(err => console.log(err))
})

//@route POST api/ventas/:id
//@description EDITAR venta
//@acceso: privado

router.post("/edit-venta-store/:ventaStoreId", passport.authenticate("jwt", {session: false}), (req, res) => {
    const ventaStoreId = req.params.ventaStoreId;
    const updatedAño = req.body.año;
    const updatedMes = req.body.mes;
    const updatedStoreId = req.body.storeId;
    const updatedOrdenes = req.body.ordenes;
    const updatedOrdenesAnuladas = req.body.ordenesAnuladas;
    const updatedMonto = req.body.monto;

    VentaStore.findById(ventaStoreId)
    .then(ventaStore => {
       ventaStore.año = updatedAño;
       ventaStore.mes = updatedMes;
       ventaStore.store = {
        id: updatedStoreId,
        ordenes : updatedOrdenes,
        ordenesAnuladas: updatedOrdenesAnuladas,
        monto: updatedMonto
       }
       return ventaStore.save();
    })
    .then(ventaStore => {
        console.log("Venta-Store actualizada");
        res.json(ventaStore)
    })
    .catch(err => console.log(err))
})

//@route DELETE api/ventas-stores/:id
//@description BORRAR venta-store
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
