const { ItemVariant, Item, Variant } = require('../models');

const getAllActiveItemVariants = async () => {
  const activeItemVariants = await ItemVariant.findAll({
    where: {
      status: 'active',
    },
    include: [
      { model: Item, attributes: ['name'], required: true },
      { model: Variant, attributes: ['name'], required: true },
    ],
    attributes: ['id', 'status'],
  });

  return activeItemVariants;
};

module.exports = {
  getAllActiveItemVariants,
};
