const { createAnItem, getAllItems } = require('../services/items');

exports.create = async (req, res) => {
  const { name } = req.body;

  try {
    const createdItem = await createAnItem(name);
    res.status(201).send(createdItem);
  } catch (error) {
    res.status(400).send(error)
  }
};

exports.list = async (req, res) => {
  try {
    const allItems = await getAllItems();
    res.status(200).send(allItems)
  } catch (error) {
    res.status(400).send(error)
  }
};