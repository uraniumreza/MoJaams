module.exports = (sequelize, DataTypes) => {
  const Variant = sequelize.define(
    'Variant',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {},
  );

  Variant.associate = (models) => {
    Variant.hasMany(models.ItemVariant, {
      foreignKey: 'variantId',
    });
  };

  return Variant;
};
