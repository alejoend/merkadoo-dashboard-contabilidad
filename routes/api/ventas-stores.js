const express = require("express");
const router = express.Router();
const ventasStoresController = require("../../controllers/ventas-stores");
const autenticar = require("../../middleware/autenticar");

router.get("/", autenticar, ventasStoresController.getVentasStores);

router.post("/register", autenticar, ventasStoresController.postVentaStore);

router.get("/:ventaStoreId", autenticar, ventasStoresController.getVentaStore);

router.post(
  "/edit-venta-store/:ventaStoreId",
  autenticar,
  ventasStoresController.postEditarVentaStore
);

router.delete(
  "/:ventaStoreId",
  autenticar,
  ventasStoresController.deleteVentaStore
);

module.exports = router;
