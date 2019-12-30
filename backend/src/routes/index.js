const express = require('express');
const itemRoutes = require('./items');
const orderRoutes = require('./orders');
const itemVariants = require('./itemVariants');

const router = express.Router();

router.route('/').get((req, res) =>
  res.status(200).send({
    message: 'Welcome to the MoJaams API Services!',
  }),
);

router.use('/v1/items', itemRoutes);
router.use('/v1/orders', orderRoutes);
router.use('/v1/item-variants', itemVariants);

module.exports = router;
