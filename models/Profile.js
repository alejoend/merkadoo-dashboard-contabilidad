const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// crear modelo
const ProfileSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: users
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  bio: {
    type: String
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
