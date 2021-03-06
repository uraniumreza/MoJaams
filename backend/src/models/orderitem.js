module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    'OrderItem',
    {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      itemVariantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
    },
    {},
  );
  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE',
    });
    OrderItem.belongsTo(models.ItemVariant, {
      foreignKey: 'itemVariantId',
      onDelete: 'CASCADE',
    });
  };
  return OrderItem;
};
