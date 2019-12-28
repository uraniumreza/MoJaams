const { OrderItem } = require('../models');

const addOrderItems = (orderId, items, transaction) => {
  try {
    return OrderItem.bulkCreate(
      items.map((item) => ({
        itemVariantId: item.itemVariantId,
        quantity: item.quantity,
        orderId,
      })),
      {
        transaction,
      },
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addOrderItems,
};
