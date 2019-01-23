const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "El handle debe ser de entre 2 y 40 carácteres";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle es un campo requerido";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
