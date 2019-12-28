const express = require('express');
const itemsController = require('../controllers').items;

const router = express.Router();

router
  .route('/')
  .get(itemsController.list)
  .post(itemsController.create);

// router
//   .route('/:orderId')
//   .get(authorize([USER, ADMIN, SALES]), controller.get)
//   .patch(authorize([ADMIN, USER]), controller.update)
//   .delete(authorize(ADMIN), controller.remove);

module.exports = router;
