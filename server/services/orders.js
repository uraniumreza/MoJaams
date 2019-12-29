const { Order, sequelize } = require('../models');
const { addOrderItems, updateOrderItems } = require('../services/orderItems');

const createOrder = async (customerName, customerAddress, items) => {
  const result = await sequelize.transaction(async (transaction) => {
    try {
      const createdOrder = await Order.create(
        {
          customerName,
          customerAddress,
        },
        {
          transaction,
        },
      );
      await addOrderItems(createdOrder.dataValues.id, items, transaction);

      return createdOrder.dataValues;
    } catch (error) {
      throw error;
    }
  });

  return result;
};

const updateOrder = async (orderId, items = [], orderMeta) => {
  return sequelize.transaction(async (transaction) => {
    try {
      if (Object.keys(orderMeta).length) {
        await Order.update(
          {
            ...orderMeta,
          },
          {
            where: { id: orderId },
          },
          {
            transaction,
          },
        );
      }

      if (items.length) await updateOrderItems(orderId, items, transaction);
    } catch (error) {
      throw error;
    }
  });
};

module.exports = {
  createOrder,
  updateOrder,
};
