const Joi = require('joi');
const { ErrorHandler, handleError } = require('../services/error');

const validator = (schema, property) => (req, res, next) => {
  try {
    const { error } = Joi.validate(req[property], schema);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      throw new ErrorHandler(422, message);
    }
  } catch (error) {
    handleError(error, res);
  }
};

module.exports = validator;
