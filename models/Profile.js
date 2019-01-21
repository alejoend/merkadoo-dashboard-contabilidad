const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// crear modelo
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  bio: {
    type: String
  },
  contacto: [
    {
      titulo: {
        type: String,
        required: true
      },
      contenido: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
