const { ItemVariant, Item, Variant, Sequelize } = require('../models');
const { createSequelizeFilter } = require('../services/utils.js');

const { Op } = Sequelize;

const getItemVariants = async (status, itemVariantIds = []) => {
  const activeItemVariants = await ItemVariant.findAll({
    where: createSequelizeFilter({
      status,
      ...(itemVariantIds.length && {
        id: {
          [Op.in]: itemVariantIds,
        },
      }),
    }),
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
