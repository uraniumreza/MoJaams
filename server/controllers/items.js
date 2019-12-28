const { createAnItem, getAllItems } = require('../services/items');
const { handleError } = require('../services/error');

exports.create = async (req, res) => {
  const { name } = req.body;

  try {
    const createdItem = await createAnItem(name);
    res.status(201).send(createdItem);
  } catch (error) {
    handleError(error, res);
  }
};

exports.list = async (req, res) => {
  try {
    const allItems = await getAllItems();
    res.status(200).send(allItems);
  } catch (error) {
    handleError(error, res);
  }
};
