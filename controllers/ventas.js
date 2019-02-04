const passport = require("passport");

// cargar modelo de ventas
const Venta = require("../models/Venta");

// cargar validación de entrada de ventas
const validateVentaInput = require("../validation/venta");

//@route GET api/ventas
//@description GET TODAS ventas
//@acceso: privado
exports.getVentas = (passport.authenticate("jwt", { session: false }),
(req, res) => {
  if (req.session.isLoggedIn) {
    Venta.find()
      .then(ventas => {
        res.json(ventas);
      })
      .catch(err => console.log(err));
  } else {
    res.status(401);
    res.redirect("/");
  }
});

//@route GET api/ventas/register
//@description GET venta form
//@acceso: privado

exports.getVentaForm = (passport.authenticate("jwt", { session: false }),
(req, res) => {
  if (req.session.isLoggedIn) {
    res
      .render("venta/register", {
        pageTitle: "Registro de venta",
        path: "api/ventas/register",
        isLoggedIn: req.session.isLoggedIn
      })
      .catch(err => console.log(err));
  } else {
    res.status(401);
    res.redirect("/");
  }
});

//@route POST api/ventas/register
//@description CREAR venta
//@acceso: privado

exports.postVenta = (passport.authenticate("jwt", { session: false }),
(req, res) => {
  const { errors, isValid } = validateVentaInput(req.body);

  // validar entrada
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const venta = new Venta({
    año: req.body.año,
    mes: req.body.mes,
    monto: req.body.monto,
    ordenes: req.body.ordenes.split(","),
    ordenesAnuladas: req.body.ordenesAnuladas.split(",")
  });

  venta
    .save()
    .then(venta => {
      res.json(venta);
    })
    .catch(err => console.log(err));
});

//@route GET api/ventas/:id
//@description GET venta especiífica
//@acceso: privado
exports.getVenta = (passport.authenticate("jwt", { session: false }),
(req, res) => {
  if (req.session.isLoggedIn) {
    const ventaId = req.params.ventaId;
    Venta.findById(ventaId)
      .then(venta => {
        res.json(venta);
      })
      .catch(err => console.log(err));
  } else {
    res.status(401);
    res.redirect("/");
  }
});

//@route POST api/ventas/:id
//@description EDITAR venta
//@acceso: privado

exports.postEditarVenta = (passport.authenticate("jwt", { session: false }),
(req, res) => {
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
      res.json(venta);
    })
    .catch(err => console.log(err));
});

//@route DELETE api/ventas/:id
//@description BORRAR venta
//@acceso: privado

exports.deleteVenta = (passport.authenticate("jwt", { session: false }),
(req, res) => {
  const ventaId = req.params.ventaId;
  Venta.findByIdAndRemove(ventaId)
    .then(() => {
      console.log("VENTA DESTRUIDA");
      res.json({ msg: "Venta destruida" });
    })
    .catch(err => console.log(err));
});
