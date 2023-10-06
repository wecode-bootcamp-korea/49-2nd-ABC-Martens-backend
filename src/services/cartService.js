const { cartDao } = require('../models');
const {
  getProductByUserIdDao,
  productCartTransaction,
  productCartsTransaction,
  deleteProductCartTransaction,
  deleteProductCartsTransaction,
} = cartDao;

const getCartProductByUserIdService = async (id) => {
  return await getProductByUserIdDao(id);
};

const addProductCartsService = (data) => {
  return productCartsTransaction(data);
};

const addProductCartService = (data) => {
  console.log(data);
  return productCartTransaction(data);
};

const updateProductCartService = (data) => {
  if (data.isDeleted) {
    return deleteProductCartTransaction(data);
  }
  return productCartTransaction(data);
};
const updateProductCartsService = (data) => {
  if (data.productList.find((d) => d.isDeleted)) {
    return deleteProductCartsTransaction(data);
  }
  return productCartsTransaction(data);
};

module.exports = {
  getCartProductByUserIdService,
  addProductCartService,
  addProductCartsService,
  updateProductCartService,
  updateProductCartsService,
};
