module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('ItemVariants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      itemId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Items',
          key: 'id',
          as: 'itemId',
        },
      },
      variantId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Variants',
          key: 'id',
          as: 'variantId',
        },
      },
      status: {
        allowNull: false,
        defaultValue: 'active',
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('ItemVariants'),
};
