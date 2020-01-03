const Sequelize = require('sequelize');
const {
  Order,
  OrderItem,
  ItemVariant,
  Item,
  Variant,
  sequelize,
} = require('../models');
const {
  addOrderItems,
  updateOrderItems,
  updateOrderItemStatus,
} = require('../services/orderItems');
const { getItemVariants } = require('../services//itemVariants');
const { ErrorHandler } = require('../services/error');
const { createSequelizeFilter } = require('./utils');

const { Op } = Sequelize;

const isAllItemVariantsActive = async (items) => {
  if (!items.length) return false;

  const itemVariantIds = items.map(({ itemVariantId }) => itemVariantId);
  const itemVariants = await getItemVariants(null, itemVariantIds);
  const isAllActive = itemVariants.every(({ status }) => status === 'active');

  return isAllActive;
};

const createOrder = async (customerName, customerAddress, items = []) => {
  const isActive = await isAllItemVariantsActive(items);
  if (!isActive) throw new ErrorHandler(400, 'One of your item is not active!');
  const result = await sequelize.transaction(async (transaction) => {
    try {
      let createdOrder = await Order.create(
        {
          customerName,
          customerAddress,
        },
        {
          transaction,
        },
      );
      createdOrder = createdOrder.get({ plain: true });
      const orderedItems = await addOrderItems(
        createdOrder.id,
        items,
        transaction,
      ).map((orderItem) => orderItem.get({ plain: true }));

      return { ...createdOrder, orderedItems };
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

  return status !== 'delivered' && status !== 'canceled';
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
        await updateOrderItemStatus(orderId, orderMeta.status, transaction);
      }

      const newItems = items.filter((item) => !item.id);
      const oldItems = items.filter((item) => item.id);
      if (oldItems.length) {
        await updateOrderItems(orderId, oldItems, transaction);
      }
      if (newItems.length) await addOrderItems(orderId, newItems, transaction);
    } catch (error) {
      throw error;
    }
  });
};

const getOrderDetail = async (orderId) => {
  const orderDetail = await Order.findOne({
    where: {
      id: orderId,
    },
    include: [
      {
        model: OrderItem,
        include: [
          {
            model: ItemVariant,
            include: [
              { model: Item, attributes: ['name'], required: true },
              { model: Variant, attributes: ['name'], required: true },
            ],
            attributes: ['id'],
            required: true,
          },
        ],
        attributes: ['quantity', 'status'],
        required: true,
      },
    ],
    attributes: { exclude: ['updatedAt'] },
  });

  return orderDetail.get({ plain: true });
};

const getOrders = async (status, customerName, limit = 10, offset = 0) => {
  const filters = createSequelizeFilter({
    status,
    ...(customerName && { customerName: { [Op.like]: `%${customerName}%` } }),
  });

  const orders = await Order.findAll({
    where: filters,
    attributes: { exclude: ['updatedAt'] },
    order: [['createdAt', 'DESC']],
    limit,
    offset,
  });

  return orders;
};

module.exports = {
  createOrder,
  updateOrder,
  getOrders,
  getOrderDetail,
};
