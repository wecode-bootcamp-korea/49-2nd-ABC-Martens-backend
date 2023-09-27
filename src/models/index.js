const { getUserIdByEmailDao, createUserDao } = require('./userDao');
const { getProductByUserIdDao } = require('./cartDao');

module.exports = {
  userDao: {
    getUserIdByEmailDao,
    createUserDao,
  },
  cartDao: {
    getProductByUserIdDao,
  },
};
