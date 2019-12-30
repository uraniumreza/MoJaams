const express = require('express');
const itemRoutes = require('./items');
const orderRoutes = require('./orders');

const router = express.Router();

router.route('/').get((req, res) =>
  res.status(200).send({
    message: 'Welcome to the MoJaams API!',
  }),
);

router.use('/v1/items', itemRoutes);
router.use('/v1/orders', orderRoutes);

module.exports = router;
