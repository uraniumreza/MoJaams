const Joi = require('joi');

const schemas = {
  item: Joi.object().keys({
    name: Joi.string().trim().max(64).required(),
  })
};

module.exports = schemas;