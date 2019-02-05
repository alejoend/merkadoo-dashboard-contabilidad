module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.status(401);
    return res.redirect("/");
  }
  next();
};
