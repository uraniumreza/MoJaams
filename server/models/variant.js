'use strict';
module.exports = (sequelize, DataTypes) => {
  const Variant = sequelize.define('Variant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});

  Variant.associate = (models) => {
    Variant.hasMany(models.ItemVariant, {
      foreignKey: 'variantId',
      as: 'itemVariants',
    });
  };

  return Variant;
};