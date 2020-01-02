const express = require('express');

const itemsController = require('./items');
const variantsController = require('./variants');
const ordersController = require('./orders');
const itemVariantsController = require('./itemVariants');

const router = express.Router();

router.route('/').get((req, res) =>
  res.status(200).send({
    message: 'Welcome to the MoJaams API Services!',
  }),
);

router.use('/v1/items', itemsController);
router.use('/v1/variants', variantsController);
router.use('/v1/orders', ordersController);
router.use('/v1/item-variants', itemVariantsController);

module.exports = router;
