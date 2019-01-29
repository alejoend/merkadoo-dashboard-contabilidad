const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// crear modelo
const VentaStoreSchema = new Schema({
    año: {
        type: String,
        required: true
    },
    mes: {
        type: String,
        required: true
    },
    store: {
        id: {
            type: Schema.Types.ObjectId,
            // required: true
        },
        ordenes: {
            type: Number,
            // required: true
        },
        ordenesAnuladas: {
            type: Number,
            default: 0
        },
        monto: {
            type: Number,
            // required: true
        }
    }
});

module.exports = Factura = mongoose.model("ventas-stores", VentaStoreSchema);
