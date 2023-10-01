const { orderDao } = require('../models');
const { generateOrderNumber } = require('../utils');
const {
  getOrderAddressByUserId,
  addOrderAddress,
  productOrderTransaction,
  productOrdersTransaction,
} = orderDao;

const getOrderAddressService = (id) => {
  return getOrderAddressByUserId(id);
};

const addOrderAddressService = (data) => {
  return addOrderAddress(data);
};

const addProductOrderService = (data) => {
  const orderNo = generateOrderNumber();
  return productOrderTransaction({ ...data, orderNo });
};

const addProductOrdersService = (data) => {
  const orderNo = generateOrderNumber();
  return productOrdersTransaction({ ...data, orderNo });
};

module.exports = {
  getOrderAddressService,
  addOrderAddressService,
  addProductOrderService,
  addProductOrdersService,
};
