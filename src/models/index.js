const { getUserIdByEmailDao, createUserDao } = require('./userDao');
const {
  getProductByUserIdDao,
  productCartTransaction,
  productCartsTransaction,
} = require('./cartDao');

module.exports = {
  userDao: {
    getUserIdByEmailDao,
    createUserDao,
  },
  cartDao: {
    getProductByUserIdDao,
    productCartTransaction,
    productCartsTransaction,
  },
};
