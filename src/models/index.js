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

const { productSortDao, categoryCheckDao } = require('./allProductDao');
const { sortQueryBuilder, pageQueryBuilder } = require('./listenQueryBuilder');

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
  allProductDao: {
    productSortDao,
    categoryCheckDao,
  },
  listenQueryBuilder: {
    sortQueryBuilder,
    pageQueryBuilder,
  },
  dataSource,
};
