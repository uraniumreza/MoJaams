const { ItemVariant, Item, Variant } = require('../models');
const { createSequelizeFilter } = require('../services/utils.js');

const getItemVariants = async (status) => {
  const activeItemVariants = await ItemVariant.findAll({
    where: createSequelizeFilter({ status }),
    include: [
      { model: Item, attributes: ['name'], required: true },
      { model: Variant, attributes: ['name'], required: true },
    ],
    attributes: ['id', 'status'],
    raw: true,
    nest: true,
  });

  return activeItemVariants;
};

module.exports = {
  getItemVariants,
};
