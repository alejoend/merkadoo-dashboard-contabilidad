const express = require("express");
const router = express.Router();
const ventasController = require("../../controllers/ventas");

//@route GET api/ventas
//@description GET TODAS ventas
//@acceso: privado
router.get("/", ventasController.getVentas);

//@route POST api/ventas/register
//@description CREAR ventas
//@acceso: privado

router.post("/register", ventasController.postVenta);

//@route GET api/ventas/:id
//@description GET venta especiífica
//@acceso: privado
router.get("/:ventaId", ventasController.getVenta);

//@route POST api/ventas/:id
//@description EDITAR venta
//@acceso: privado

router.post("/edit-venta/:ventaId", ventasController.postEditarVenta);

//@route DELETE api/ventas/:id
//@description BORRAR venta
//@acceso: privado

router.delete("/:ventaId", ventasController.deleteVenta);

module.exports = router;
