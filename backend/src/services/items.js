const { Item } = require('../models');
const { createSequelizeFilter } = require('../services/utils');

const createItem = (name) =>
  Item.create({
    name,
  });

const getItem = (itemId) =>
  Item.findOne({ where: { id: itemId, raw: true, nest: true } });

const getItems = (status) =>
  Item.findAll({
    where: createSequelizeFilter({ status }),
    raw: true,
    nest: true,
  });

module.exports = {
  createItem,
  getItems,
  getItem,
};
