const { cartDao } = require('../models');
const { getProductByUserIdDao, productCartsTransaction } = cartDao;

const getCartProductByUserIdService = async (id) => {
  return await getProductByUserIdDao(id);
};
const addProductCartsService = (data) => {
  return productCartsTransaction(data);
};

module.exports = {
  getCartProductByUserIdService,
  addProductCartsService,
};
