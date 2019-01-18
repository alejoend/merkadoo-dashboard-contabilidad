const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();

// bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json);

// database configuration
const db = require("./config/keys").mongoURI;

// connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("conexión exitosa con mongoDB"))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

app.use("/prueba", () => {
  console.log("prueba");
});
// rutas
app.use("/api/users", users);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`servidor corriendo en puerto ${port}`));
