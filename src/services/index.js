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
} = require('./cartService');
const { productReader } = require('./productService');
const {
  getOrderAddressService,
  addOrderAddressService,
  addProductOrderService,
  addProductOrdersService,
  orderCheckoutService,
} = require('./orderService');

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
