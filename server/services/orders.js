const { Order, sequelize } = require('../models');
const {
  addOrderItems,
  updateOrderItems,
  updateOrderItemsStatus,
} = require('../services/orderItems');
const { ErrorHandler } = require('../services/error');

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

const canUpdateOrder = async (orderId) => {
  if (!orderId) return false;

  const { status } = await Order.findOne({
    where: {
      id: orderId,
    },
    attributes: ['status'],
    raw: true,
  });

  return status !== 'delivered';
};

const updateOrder = async (orderId, items = [], orderMeta) => {
  const canUpdate = await canUpdateOrder(orderId);
  if (!canUpdate) {
    throw new ErrorHandler(
      400,
      "This order cannot be updated because it's delivered!",
    );
  }

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

      if (orderMeta.status) {
        await updateOrderItemsStatus(orderId, orderMeta.status, transaction);
      }
      if (items.length) {
        await updateOrderItems(orderId, items, transaction);
      }
    } catch (error) {
      throw error;
    }
  });
};

module.exports = {
  createOrder,
  updateOrder,
};
