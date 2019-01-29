const express = require("express");
const router = express.Router();
const passport = require("passport");

// cargar modelo de ventas
const Venta = require("../../models/Venta");

//@route GET api/ventas
//@description GET TODAS ventas
//@acceso: privado
router.get("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    Venta.find()
    .then(ventas => {
        res.json(ventas);
    }).catch(err => console.log(err));
})

//@route POST api/ventas/register
//@description CREAR ventas
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
//@description GET venta especiífica
//@acceso: privado
router.get("/:ventaId", passport.authenticate("jwt", {session: false}), (req, res) => {
    const ventaId = req.params.ventaId;
    Venta.findById(ventaId)
    .then(venta => {
        res.json(venta);
    }).catch(err => console.log(err))
})

//@route POST api/ventas/:id
//@description EDITAR venta
//@acceso: privado

router.post("/edit-venta/:ventaId", passport.authenticate("jwt", {session: false}), (req, res) => {
    const ventaId = req.params.ventaId;
    const updatedAño = req.body.año;
    const updatedMes = req.body.mes;
    const updatedMonto = req.body.monto;
    const updatedOrdenes = req.body.ordenes;
    const updatedOrdenesAnuladas = req.body.ordenesAnuladas;

    Venta.findById(ventaId)
    .then(venta => {
       venta.año = updatedAño;
       venta.mes = updatedMes;
       venta.monto = updatedMonto;
       venta.ordenes = updatedOrdenes;
       venta.ordenesAnuladas = updatedOrdenesAnuladas;
       return venta.save();
    })
    .then(venta => {
        console.log("Venta actualizada");
        res.json(venta)
    })
    .catch(err => console.log(err))
})

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
  
    Product.findById(prodId)
      .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDesc;
        product.imageUrl = updatedImageUrl;
        return product.save();
      })
      .then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products');
      })
      .catch(err => console.log(err));
  };

//@route DELETE api/ventas/:id
//@description BORRAR venta
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