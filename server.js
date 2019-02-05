const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");

const helmet = require("helmet");
const passport = require("passport");
const csrf = require("csurf");

const keys = require("./config/keys");
const User = require("./models/User");

const indexRoutes = require("./routes/api/index");
const userRoutes = require("./routes/api/users");
const profileRoutes = require("./routes/api/profile");
const ventaRoutes = require("./routes/api/ventas");
const ventaStoreRoutes = require("./routes/api/ventas-stores");
const errorController = require("./controllers/error");

const app = express();
const store = new MongoDBStore({
  uri: keys.mongoURI,
  collection: "sessions"
});
const csrfProtection = csrf();

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
app.use(csrfProtection);

// conectar a mongo db
mongoose
  .connect(keys.mongoURI)
  .then(() => {
    console.log("conexión exitosa con mongo DB");
  })
  .catch(err => console.log(err));

app.use((req, res, next) => {
  if (!req.session.user) {
    res.locals.user = null;
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// passport middleware
app.use(passport.initialize());
// passport configuración
require("./config/passport")(passport);

//
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  res.locals.user = req.session.user;
  next();
});

// rutas
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/ventas-stores", ventaStoreRoutes);
app.use(indexRoutes);
app.use(errorController.get404);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`servidor corriendo en puerto ${port}`));
