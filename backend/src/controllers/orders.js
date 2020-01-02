const express = require('express');
const Joi = require('joi');

const {
  createOrder,
  updateOrder,
  getOrders,
  getOrderDetail,
} = require('../services/orders');
const { handleError } = require('../services/error');
const { validator } = require('../middlewares');

const router = express.Router();

router
  .route('/')
  .post(
    validator(
      Joi.object().keys({
        customerName: Joi.string()
          .trim()
          .required(),
        customerAddress: Joi.string()
          .trim()
          .required(),
        items: Joi.array()
          .min(1)
          .items(
            Joi.object().keys({
              itemVariantId: Joi.number().required(),
              quantity: Joi.number()
                .min(1)
                .required(),
            }),
          )
          .required(),
      }),
      'body',
    ),
    async (req, res) => {
      const { customerName, customerAddress, items } = req.body;

      try {
        const createdOrder = await createOrder(
          customerName,
          customerAddress,
          items,
        );
        res.status(201).send(createdOrder);
      } catch (error) {
        handleError(error, res);
      }
    },
  )
  .get(
    validator(
      Joi.object().keys({
        status: Joi.string().trim(),
        customerName: Joi.string().trim(),
        limit: Joi.number(),
        offset: Joi.number(),
      }),
      'query',
    ),
    async (req, res) => {
      const { limit, offset, status, customerName } = req.query;

      try {
        const orders = await getOrders(status, customerName, limit, offset);
        res.status(200).send({ orders });
      } catch (error) {
        handleError(error, res);
      }
    },
  );

router
  .route('/:orderId')
  .get(
    validator(
      Joi.object().keys({
        orderId: Joi.number().required(),
      }),
      'params',
    ),
    async (req, res) => {
      const { orderId } = req.params;

      try {
        const { OrderItems, ...orderMeta } = await getOrderDetail(orderId);
        const formattedOrderItems = OrderItems.map(
          ({ quantity, status, ItemVariant }) => ({
            quantity,
            status,
            itemName: ItemVariant.Item.name,
            variantName: ItemVariant.Variant.name,
          }),
        );

        res.status(200).send({ ...orderMeta, orderItems: formattedOrderItems });
      } catch (error) {
        handleError(error, res);
      }
    },
  )
  .patch(
    validator(
      Joi.object().keys({
        customerName: Joi.string().trim(),
        customerAddress: Joi.string().trim(),
        status: Joi.string().trim(),
        items: Joi.array().items(
          Joi.object().keys({
            id: Joi.number(),
            itemVariantId: Joi.number(),
            quantity: Joi.number(),
          }),
        ),
      }),
      'body',
    ),
    validator(
      Joi.object().keys({
        orderId: Joi.number().required(),
      }),
      'params',
    ),
    async (req, res) => {
      const { orderId } = req.params;
      const { items, ...orderMeta } = req.body;
      try {
        const updatedOrder = await updateOrder(orderId, items, orderMeta);
        res.status(200).send(updatedOrder);
      } catch (error) {
        handleError(error, res);
      }
    },
  );

module.exports = router;
