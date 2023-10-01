const { getUserIdByEmailDao, createUserDao } = require('./userDao');
const {
  getProductByUserIdDao,
  productCartTransaction,
  productCartsTransaction,
} = require('./cartDao');
const {
  getOrderAddressByUserId,
  addOrderAddress,
  productOrderTransaction,
  productOrdersTransaction,
} = require('./orderDao');

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
  orderDao: {
    getOrderAddressByUserId,
    addOrderAddress,
    productOrderTransaction,
    productOrdersTransaction,
  },
};
