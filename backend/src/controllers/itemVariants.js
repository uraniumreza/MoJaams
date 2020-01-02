const express = require('express');
const Joi = require('joi');
const { getItemVariants } = require('../services/itemVariants');
const { handleError } = require('../services/error');
const { validator } = require('../middlewares');

const router = express.Router();

router.route('/').get(
  validator(
    Joi.object().keys({
      status: Joi.string().trim(),
    }),
    'query',
  ),
  async (req, res) => {
    const { status } = req.query;
    try {
      const allItemVariants = await getItemVariants(status);

      const formattedItemVariants = await allItemVariants.map(
        ({ id, status: itemVariantStatus, ...itemVariant }) => ({
          id,
          status: itemVariantStatus,
          itemName: itemVariant.Item.name,
          variantName: itemVariant.Variant.name,
        }),
      );

      res.status(200).send(formattedItemVariants);
    } catch (error) {
      handleError(error, res);
    }
  },
);

module.exports = router;
