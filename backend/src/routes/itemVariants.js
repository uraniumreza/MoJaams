const express = require('express');
const itemVariantsController = require('../controllers').itemVariants;

const router = express.Router();

router.route('/').get(itemVariantsController.list);

module.exports = router;
