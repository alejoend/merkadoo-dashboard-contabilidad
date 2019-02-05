exports.getIndex = (req, res) => {
  res.render("index", {
    pageTitle: "Merkadoo Contabilidad",
    path: "/"
  });
};
