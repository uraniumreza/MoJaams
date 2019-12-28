const Joi = require("joi");
const { ErrorHandler } = require('../services/error');

const validator = (schema, property) => {
  try {
    return (req, res, next) => {
      const { error } = Joi.validate(req[property], schema);
      const valid = error == null;

      if (valid) {
        next();
      } else {
        const { details } = error;
        const message = details.map(i => i.message).join(",");

        throw new ErrorHandler(422, message);
      }
    };
  } catch (error) {
    next(error);
  }
};

module.exports = validator;
