const { dataSource } = require('./dataSource');
const {
  getUserIdByEmailDao,
  createUserDao,
  setNewPasswordDao,
} = require('./userDao');
const {
  getProductByUserIdDao,
  productCartTransaction,
  productCartsTransaction,
} = require('./cartDao');

module.exports = {
  userDao: {
    getUserIdByEmailDao,
    createUserDao,
    setNewPasswordDao,
  },
  cartDao: {
    getProductByUserIdDao,
    productCartTransaction,
    productCartsTransaction,
  },
};
