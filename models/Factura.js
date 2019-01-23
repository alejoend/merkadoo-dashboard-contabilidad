const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// crear modelo
const FacturaSchema = new Schema({});

module.exports = Factura = mongoose.model("facturas", FacturaSchema);
