module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'ItemVariants',
      [
        {
          itemId: 1,
          variantId: 1,
          status: 'active',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
        {
          itemId: 1,
          variantId: 2,
          status: 'active',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
        {
          itemId: 1,
          variantId: 3,
          status: 'active',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
        {
          itemId: 2,
          variantId: 1,
          status: 'active',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
        {
          itemId: 2,
          variantId: 2,
          status: 'active',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
        {
          itemId: 3,
          variantId: 1,
          status: 'inactive',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
      ],
      {},
    ),

  down: (queryInterface, Sequelize) => {
    const { Op } = Sequelize;
    return queryInterface.bulkDelete(
      'ItemVariants',
      { id: { [Op.in]: [1, 2, 3, 4, 5, 6] } },
      {},
    );
  },
};
