const {
  createOrder,
  updateOrder,
  getOrders,
  getOrderDetail,
} = require('../services/orders');
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

exports.get = async (req, res) => {
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
};

exports.list = async (req, res) => {
  const { limit, offset, status, customerName } = req.query;
  console.log('* CONTROLLER *');
  try {
    const orders = await getOrders(status, customerName, limit, offset);
    res.status(200).send({ orders });
  } catch (error) {}
};
