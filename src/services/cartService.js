const { cartDao } = require('../models');
const { getProductByUserIdDao } = cartDao;

const getCartProductByUserIdService = async (id) => {
  return await getProductByUserIdDao(id);
};

module.exports = {
  getCartProductByUserIdService,
};
