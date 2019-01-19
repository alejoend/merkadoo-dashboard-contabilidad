const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const facturas = require("./routes/api/facturas");

const app = express();

// configuración de base de datos
const db = require("./config/keys").mongoURI;

// conectar a mongo db
mongoose
  .connect(db)
  .then(() => {
    console.log("conexión exitosa con mongo DB");
  })
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello!");
});

// rutas
app.use("/api/users/", users);
app.use("/api/profile/", profile);
app.use("/api/facturas/", facturas);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`servidor corriendo en puerto ${port}`));
