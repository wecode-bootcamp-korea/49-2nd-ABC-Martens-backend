const { getUserIdByEmailDao, createUserDao } = require('./userDao');
const { getProductByUserIdDao, productCartsTransaction } = require('./cartDao');

module.exports = {
  userDao: {
    getUserIdByEmailDao,
    createUserDao,
  },
  cartDao: {
    getProductByUserIdDao,
    productCartsTransaction,
  },
};
