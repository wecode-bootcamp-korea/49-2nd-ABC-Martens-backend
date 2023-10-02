const { dataSource } = require('./dataSource');
const productDao = require('./productDao');
  const selector = productDao.selector;
  const introducer = productDao.introducer;
  const price = productDao.price;
  const colorLoader = productDao.colorLoader;
  const option = productDao.option;
  const imageLoader = productDao.imageLoader;

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
  productDao: {
    selector,
    introducer,
    price,
    colorLoader,
    option,
    imageLoader,
  }
};
