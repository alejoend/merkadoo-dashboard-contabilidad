const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateContactoInput(data) {
  let errors = {};

  data.titulo = !isEmpty(data.titulo) ? data.titulo : "";
  data.contenido = !isEmpty(data.contenido) ? data.contenido : "";

  if (Validator.isEmpty(data.titulo)) {
    errors.titulo = "Titulo es requerido";
  }

  if (Validator.isEmpty(data.contenido)) {
    errors.contenido = "Contenido es requerido";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
