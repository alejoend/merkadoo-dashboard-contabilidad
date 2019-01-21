const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.nombre = !isEmpty(data.nombre) ? data.nombre : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.nombre, { min: 2, max: 30 })) {
    errors.nombre = "El nombre debe consistir de entre 2 y 30 carácteres";
  }

  if (Validator.isEmpty(data.nombre)) {
    errors.nombre = "Nombre es requerido";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email es requerido";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "El email es inválido";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Contraseña es requerida";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "La contraseña debe tener 6 carácteres mínimo";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirmar la contraseña es requerido";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Las contraseñas no coinciden";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
