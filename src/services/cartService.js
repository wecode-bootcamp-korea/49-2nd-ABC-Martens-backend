const { cartDao } = require('../models');
const {
  getProductByUserIdDao,
  productCartTransaction,
  productCartsTransaction,
} = cartDao;

const getCartProductByUserIdService = async (id) => {
  return await getProductByUserIdDao(id);
};

const addProductCartsService = (data) => {
  return productCartsTransaction(data);
};

const addProductCartService = (data) => {
  return productCartTransaction(data);
};
module.exports = {
  getCartProductByUserIdService,
  addProductCartService,
  addProductCartsService,
};
