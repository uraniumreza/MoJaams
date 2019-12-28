const Item = require('../models').Item;

const createAnItem = async (name) => {
  return Item.create({
    name: name,
  });
};

const getAllItems = async () => {
  return Item.findAll();
};

module.exports = {
  createAnItem,
  getAllItems,
}