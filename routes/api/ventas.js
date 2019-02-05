const express = require("express");
const router = express.Router();
const ventasController = require("../../controllers/ventas");
const autenticar = require("../../middleware/autenticar");

router.get("/", autenticar, ventasController.getVentas);

router.post("/register", autenticar, ventasController.postVenta);

router.get("/:ventaId", autenticar, ventasController.getVenta);

router.post(
  "/edit-venta/:ventaId",
  autenticar,
  ventasController.postEditarVenta
);

router.delete("/:ventaId", autenticar, ventasController.deleteVenta);

module.exports = router;
