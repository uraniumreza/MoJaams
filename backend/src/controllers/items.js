const express = require('express');
const Joi = require('joi');

const { createItem, getItems } = require('../services/items');
const { handleError } = require('../services/error');
const { validator } = require('../middlewares');

const router = express.Router();

router
  .route('/')
  .get(
    validator(
      Joi.object().keys({
        status: Joi.string().trim(),
      }),
      'query',
    ),
    async (req, res) => {
      const { status } = req.query;
      try {
        const allItems = await getItems(status);
        res.status(200).send(allItems);
      } catch (error) {
        handleError(error, res);
      }
    },
  )
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
    async (req, res) => {
      const { name } = req.body;

      try {
        const createdItem = await createItem(name);
        res.status(201).send(createdItem);
      } catch (error) {
        handleError(error, res);
      }
    },
  );

module.exports = router;
