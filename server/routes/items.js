const express = require('express');
const itemsController = require('../controllers').items;
const validator = require('../middlewares').validator;
const itemSchema = require('../services/schemas').item;
const router = express.Router();

router
  .route('/')
  .get(itemsController.list)
  .post(validator(itemSchema, 'body'), itemsController.create);

module.exports = router;
