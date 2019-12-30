const { Item } = require('../models');

const createAnItem = async (name) =>
  Item.create({
    name,
  });

const getAllItems = async () => Item.findAll();

module.exports = {
  createAnItem,
  getAllItems,
};
