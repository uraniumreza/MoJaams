module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Variants',
      [
        {
          name: 'Large',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
        {
          name: 'Medium',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
        {
          name: 'Small',
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
