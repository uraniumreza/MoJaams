const express = require('express');
const Joi = require('joi');
const ordersController = require('../controllers').orders;
const { validator } = require('../middlewares');

const router = express.Router();

router.route('/').post(
  validator(
    Joi.object().keys({
      customerName: Joi.string()
        .trim()
        .required(),
      customerAddress: Joi.string()
        .trim()
        .required(),
      items: Joi.array().items(
        Joi.object().keys({
          itemVariantId: Joi.number().required(),
          quantity: Joi.number()
            .min(1)
            .required(),
        }),
      ),
    }),
    'body',
  ),
  ordersController.create,
);

module.exports = router;
