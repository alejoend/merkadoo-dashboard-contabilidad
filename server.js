const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const facturas = require("./routes/api/facturas");

const app = express();

// middleware de body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configuración de base de datos
const db = require("./config/keys").mongoURI;

// conectar a mongo db
mongoose
  .connect(db)
  .then(() => {
    console.log("conexión exitosa con mongo DB");
  })
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());
// passport configuración
require("./config/passport")(passport);

// rutas
app.use("/api/users/", users);
app.use("/api/profile/", profile);
app.use("/api/facturas/", facturas);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`servidor corriendo en puerto ${port}`));
