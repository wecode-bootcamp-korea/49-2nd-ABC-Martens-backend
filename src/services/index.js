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
  },

  allProductService: {
    productSortService,
    categoryCheckService,
  },
  orderService: {
    getOrderAddressService,
    addOrderAddressService,
    addProductOrderService,
    addProductOrdersService,
    orderCheckoutService,
  },
};
