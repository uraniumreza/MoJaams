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
    const updatedItems = await items.map(async ({ id, ...itemMeta }) => {
      const updatedOrderItem = await OrderItem.update(
        { ...itemMeta, ...(itemMeta.quantity === 0 && { status: 'canceled' }) },
        { where: { id: orderId } },
        { transaction },
      );

      return updatedOrderItem;
    });

    return updatedItems;
  } catch (error) {
    throw error;
  }
};

const updateOrderItemStatus = async (orderId, status, transaction) => {
  try {
    const updatedItems = await OrderItem.update(
      { status },
      { where: { orderId } },
      { transaction },
    );

    return updatedItems;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addOrderItems,
  updateOrderItems,
  updateOrderItemStatus,
};
