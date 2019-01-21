const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!validator.isLength(data.nombre, { min: 2, max: 30 })) {
    errors.nombre = "El nombre debe consistir de entre 2 y 30 carácteres";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
