const { createAnOrder } = require('../services/orders');
const { handleError } = require('../services/error');

exports.create = async (req, res) => {
  const { customerName, customerAddress, items } = req.body;

  try {
    const createdOrder = await createAnOrder(customerName, customerAddress, items);
    res.status(201).send(createdOrder);
  } catch (error) {
    handleError(error, res);
  }
};
