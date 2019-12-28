module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Orders',
          key: 'id',
          as: 'orderId',
        },
      },
      itemVariantId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'ItemVariants',
          key: 'id',
          as: 'itemVariantId',
        },
      },
      quantity: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        defaultValue: 'pending',
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
  down: (queryInterface) => queryInterface.dropTable('OrderItems'),
};
