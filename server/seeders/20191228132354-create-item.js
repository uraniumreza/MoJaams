module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Items',
      [
        {
          name: 'Margarita',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
        {
          name: 'Four Seasons',
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
