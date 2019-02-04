const express = require("express");
const helmet = require("helmet");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");

const User = require("./models/User");

const userRoutes = require("./routes/api/users");
const profileRoutes = require("./routes/api/profile");
const ventaRoutes = require("./routes/api/ventas");
const ventaStoreRoutes = require("./routes/api/ventas-stores");

const app = express();
const store = new MongoDBStore({
  uri: keys.mongoURI,
  collection: "sessions"
});

app.set("view engine", "ejs");
app.set("views", "views");
// ponerse el casco es importante
app.use(helmet());

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: keys.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// conectar a mongo db
mongoose
  .connect(keys.mongoURI)
  .then(() => {
    console.log("conexión exitosa con mongo DB");
  })
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());
// passport configuración
require("./config/passport")(passport);

// rutas
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/ventas-stores", ventaStoreRoutes);
app.use("/", (req, res) => {
  res.render("index", {
    pageTitle: "Merkadoo Contabilidad",
    path: "/",
    isLoggedIn: req.session.isLoggedIn
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`servidor corriendo en puerto ${port}`));
