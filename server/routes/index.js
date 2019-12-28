const express = require('express');
const itemRoutes = require('./items');

const router = express.Router();

router.route('/').get((req, res) =>
  res.status(200).send({
    message: 'Welcome to the MoJaams API!',
  }),
);

router.use('/v1/items', itemRoutes);

module.exports = router;
