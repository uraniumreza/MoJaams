module.exports = (sequelize, DataTypes) => {
  const ItemVariant = sequelize.define(
    'ItemVariant',
    {
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      variantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
      },
    },
    {},
  );

  ItemVariant.associate = (models) => {
    ItemVariant.belongsTo(models.Item, {
      foreignKey: 'itemId',
      onDelete: 'CASCADE',
    });
    ItemVariant.belongsTo(models.Variant, {
      foreignKey: 'variantId',
      onDelete: 'CASCADE',
    });
    ItemVariant.hasMany(models.OrderItem, {
      foreignKey: 'itemVariantId',
    });
  };

  return ItemVariant;
};
