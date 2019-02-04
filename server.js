const express = require("express");
const helmet = require("helmet");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const ventas = require("./routes/api/ventas");
const ventasStores = require("./routes/api/ventas-stores");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
// ponerse el casco es importante
app.use(helmet());

// middleware de body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

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
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/ventas", ventas);
app.use("/api/ventas-stores", ventasStores);
app.use("/", (req, res) => {
  /*const isLoggedIn = req
    .get("Cookie")
    .split(";")[0]
    .trim()
    .split("=")[1];
  const token = req
    .get("Cookie")
    .split(";")[1]
    .trim()
    .split("=")[1];
  console.log("Token:", token);*/

  res.render("index", {
    pageTitle: "Merkadoo Contabilidad",
    path: "/"
    //isAuthenticated: isLoggedIn
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`servidor corriendo en puerto ${port}`));
