const express = require('express');
const Joi = require('joi');

const { createAnItem } = require('../services/items');
const { handleError } = require('../services/error');
const { validator } = require('../middlewares');

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      const allItems = await getAllItems();
      res.status(200).send(allItems);
    } catch (error) {
      handleError(error, res);
    }
  })
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
        const createdItem = await createAnItem(name);
        res.status(201).send(createdItem);
      } catch (error) {
        handleError(error, res);
      }
    },
  );

module.exports = router;
