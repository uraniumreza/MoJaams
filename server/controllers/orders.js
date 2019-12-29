const { createOrder, updateOrder } = require('../services/orders');
const { handleError } = require('../services/error');

exports.create = async (req, res) => {
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
};

exports.update = async (req, res) => {
  const { orderId } = req.params;
  const { items, ...orderMeta } = req.body;
  try {
    const updatedOrder = await updateOrder(orderId, items, orderMeta);
    res.status(200).send(updatedOrder);
  } catch (error) {
    handleError(error, res);
  }
};
