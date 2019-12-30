const express = require('express');
const Joi = require('joi');
const itemsController = require('../controllers').items;
const { validator } = require('../middlewares');

const router = express.Router();

router
  .route('/')
  .get(itemsController.list)
  .post(
    validator(
      Joi.object().keys({
        name: Joi.string()
          .trim()
          .max(64)
          .required(),
      }),
      'body',
    ),
    itemsController.create,
  );

module.exports = router;
