const express = require("express");
const router = express.Router();
const ventasStoresController = require("../../controllers/ventas-stores");

//@route GET api/ventas-stores
//@description GET TODAS ventas-stores
//@acceso: privado

router.get("/", ventasStoresController.getVentasStores);

//@route POST api/ventas-stores/register
//@description CREAR venta-store
//@acceso: privado

router.post("/register", ventasStoresController.postVentaStore);

//@route GET api/ventas-stores/:id
//@description GET venta-store especiífica
//@acceso: privado

router.get("/:ventaStoreId", ventasStoresController.getVentaStore);

//@route POST api/edit-venta-store/:ventaStoreId
//@description EDITAR venta
//@acceso: privado

router.post(
  "/edit-venta-store/:ventaStoreId",
  ventasStoresController.postEditarVentaStore
);

//@route DELETE api/ventas-stores/:id
//@description BORRAR venta-store
//@acceso: privado

router.delete("/:ventaStoreId", ventasStoresController.deleteVentaStore);

module.exports = router;
