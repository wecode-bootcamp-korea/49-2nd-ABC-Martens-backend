const { dataSource } = require('./dataSource');
const { getUserIdByEmailDao, createUserDao } = require('./userDao');
const productDao = require('./productDao');
  const selector = productDao.selector;
  const introducer = productDao.introducer;
  const price = productDao.price;
  const colorLoader = productDao.colorLoader;
  const option = productDao.option;
  const imageLoader = productDao.imageLoader;

module.exports = {
  dataSource,
  userDao: {
    getUserIdByEmailDao,
    createUserDao,
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
