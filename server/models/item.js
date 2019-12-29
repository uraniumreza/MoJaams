module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    'Item',
    {
      name: {
        type: DataTypes.STRING,
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

  Item.associate = (models) => {
    Item.hasMany(models.ItemVariant, {
      foreignKey: 'itemId',
    });
  };

  return Item;
};
