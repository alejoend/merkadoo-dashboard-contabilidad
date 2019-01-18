const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // convertir campos vacios en cadenas vacias para poder usar las funciones del validador

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.pasword2 = !isEmpty(data.pasword2) ? data.pasword2 : "";

  // verificar nombre
  if (Validator.isEmpty(data.name)) {
    error.name = "Nombre es un campo requerido";
  }

  // verificar email
  if (Validator.isEmpty(data.email)) {
    error.email = "Email es un campo requerido";
  } else if (!Validator.isEmail(data.email)) {
    error.email = "email inválido";
  }

  // verificar contraseña
  if (Validator.isEmpty(data.password)) {
    error.password = "Contraseña es un campo requerido";
  }

  if (Validator.isEmpty(data.pasword2)) {
    error.pasword2 = "Confirmar contraseña es un campo requerido";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    error.password = "La contraseña debe ser de 6 a 30 carácteres de longitud";
  }

  if (!Validator.equals(data.password, data.pasword2)) {
    error.password = "Las contraseñas no coinciden";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
