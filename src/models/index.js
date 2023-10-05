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

const productDao = require('./productDao');
const selector = productDao.selector;
const introducer = productDao.introducer;
const price = productDao.price;
const colorLoader = productDao.colorLoader;
const option = productDao.option;
const imageLoader = productDao.imageLoader;

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
  productDao: {
    selector,
    introducer,
    price,
    colorLoader,
    option,
    imageLoader,
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
