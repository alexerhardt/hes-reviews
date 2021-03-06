/**
 * login.js
 * Server-side validation for user login inputs
 */
const Validator = require('validator');

module.exports = data => {
  let errors = {};

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 && errors.constructor === Object,
  };
};
