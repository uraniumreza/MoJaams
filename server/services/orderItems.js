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

const updateOrderItems = async (orderId, items, transaction) => {
  try {
    const orderedItems = await OrderItem.bulkCreate(
      items.map(({ id, ...itemMeta }) => ({
        id,
        orderId,
        ...itemMeta,
      })),
      { updateOnDuplicate: ['id'], transaction },
    );

    return orderedItems;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addOrderItems,
  updateOrderItems,
};
