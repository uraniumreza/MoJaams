module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'ItemVariants',
      [
        {
          itemId: 1,
          variantId: 1,
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
        {
          itemId: 1,
          variantId: 2,
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
        {
          itemId: 1,
          variantId: 3,
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
        {
          itemId: 2,
          variantId: 1,
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
        {
          itemId: 2,
          variantId: 2,
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
        {
          itemId: 2,
          variantId: 3,
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
      ],
      {},
    ),

  down: () => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
