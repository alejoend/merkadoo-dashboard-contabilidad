const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateVentaInput(data) {
  let errors = {};

  data.año = !isEmpty(data.año) ? data.año : "";
  data.mes = !isEmpty(data.mes) ? data.mes : "";
  data.monto = !isEmpty(data.monto) ? data.monto : "";
  data.ordenes = !isEmpty(data.ordenes) ? data.ordenes : "";

  if (Validator.isEmpty(data.año)) {
    errors.año = "Año es requerido";
  }

  if (Validator.isEmpty(data.mes)) {
    errors.mes = "Mes es requerido";
  }

  if (Validator.isEmpty(data.monto)) {
    errors.monto = "Monto es requerido";
  }

  if (Validator.isEmpty(data.ordenes)) {
    errors.ordenes = "Ordenes es requerido";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
