const {
  getUserIdByEmailService,
  createUserService,
  mailSendService,
  setNewPasswordService,
} = require('./userService');
const {
  getCartProductByUserIdService,
  addProductCartService,
  addProductCartsService,
  updateProductCartService,
  updateProductCartsService,
} = require('./cartService');
const { productReader } = require('./productService');
const {
  getOrderAddressService,
  addOrderAddressService,
  addProductOrderService,
  addProductOrdersService,
  orderCheckoutService,
} = require('./orderService');

const {
  productSortService,
  categoryCheckService,
} = require('./allProductService');

module.exports = {
  userService: {
    getUserIdByEmailService,
    createUserService,
    mailSendService,
    setNewPasswordService,
  },
  cartService: {
    getCartProductByUserIdService,
    addProductCartService,
    addProductCartsService,
    updateProductCartService,
    updateProductCartsService,
  },
  allProductService: {
    productSortService,
    categoryCheckService,
  },
  productService: {
    productReader,
  },
  orderService: {
    getOrderAddressService,
    addOrderAddressService,
    addProductOrderService,
    addProductOrdersService,
    orderCheckoutService,
  },
};
