const { dataSource } = require('./dataSource');

const {
  getUserIdByEmailDao,
  createUserDao,
  setNewPasswordDao,
  getUserUidByOrderNumberQuery,
} = require('./userDao');
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
  orderCheckoutDao,
} = require('./orderDao');

const { productSortDao, categoryCheckDao } = require('./allProductDao');
const { sortQueryBuilder, pageQueryBuilder } = require('./listenQueryBuilder');

module.exports = {
  userDao: {
    getUserIdByEmailDao,
    createUserDao,
    setNewPasswordDao,
    getUserUidByOrderNumberQuery,
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
  orderDao: {
    getOrderAddressByUserId,
    addOrderAddress,
    productOrderTransaction,
    productOrdersTransaction,
    orderCheckoutDao,
  },
  dataSource,
};
