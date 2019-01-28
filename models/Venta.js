const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// crear modelo
const VentaSchema = new Schema({
    año: {
        type: String,
        required: true
    },
    mes: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    ordenes: {
        type: Number,
        required: true
    },
    ordenesAnuladas: {
        type: Number,
        default: 0
    }
});

module.exports = Factura = mongoose.model("ventas", VentaSchema);

/* 
año
mes
ordenes
ordenes anuladas
monto
*/