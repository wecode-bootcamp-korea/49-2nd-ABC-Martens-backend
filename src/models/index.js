const { dataSource } = require('./dataSource');
const { getUserIdByEmailDao, createUserDao } = require('./userDao');
const productDetailDao = require('./productDetailDao');
const selector = productDetailDao.selector;
const introducer =  productDetailDao.introducer;
const price = productDetailDao.price;
const colorLoader = productDetailDao.colorLoader;
const option = productDetailDao.option;
const imageLoader = productDetailDao.imageLoader;

module.exports = {
  dataSource,
  userDao: {
    getUserIdByEmailDao,
    createUserDao,
  },

  productDetailDao: {
    selector,
    introducer,
    price,
    colorLoader,
    option,
    imageLoader
  }
};
