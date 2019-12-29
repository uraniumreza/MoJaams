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
    const updatedItems = await OrderItem.bulkCreate(
      items.map(({ id, ...itemMeta }) => ({
        id,
        orderId,
        ...itemMeta,
      })),
      { updateOnDuplicate: ['id'], transaction },
    );

    return updatedItems;
  } catch (error) {
    throw error;
  }
};

const updateOrderItemsStatus = async (orderId, status, transaction) => {
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
  updateOrderItemsStatus,
};
