const express = require('express');
const Joi = require('joi');

const { createVariant, getVariant } = require('../services/variants');
const { handleError } = require('../services/error');
const { validator } = require('../middlewares');

const router = express.Router();

router.route('/').post(
  validator(
    Joi.object().keys({
      name: Joi.string()
        .trim()
        .max(64)
        .required(),
    }),
    'body',
  ),
  async (req, res) => {
    const { name } = req.body;

    try {
      const createdVariant = await createVariant(name);
      res.status(201).send(createdVariant);
    } catch (error) {
      handleError(error, res);
    }
  },
);

router.route('/:variantId').get(
  validator(
    Joi.object().keys({
      variantId: Joi.number().required(),
    }),
    'params',
  ),
  async (req, res) => {
    const { variantId } = req.params;

    try {
      const variant = await getVariant(variantId);
      res.status(200).send(variant);
    } catch (error) {
      handleError(error, res);
    }
  },
);

module.exports = router;
