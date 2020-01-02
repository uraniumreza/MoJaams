const { Variant } = require('../models');

const createVariant = (variantName) =>
  Variant.create({
    variantName,
  });

const getVariant = (variantId) =>
  Variant.findOne({ where: { id: variantId, raw: true, nest: true } });

module.exports = {
  createVariant,
  getVariant,
};
