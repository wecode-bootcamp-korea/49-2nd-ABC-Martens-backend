const { getUserIdByEmailService, createUserService } = require('./userService');
const {
  getCartProductByUserIdService,
  addProductCartService,
  addProductCartsService,
} = require('./cartService');
const {
  getOrderAddressService,
  addProductOrderService,
  addProductOrdersService,
} = require('./orderService');

module.exports = {
  userService: {
    getUserIdByEmailService,
    createUserService,
  },
  cartService: {
    getCartProductByUserIdService,
    addProductCartService,
    addProductCartsService,
  },
  orderService: {
    getOrderAddressService,
    addProductOrderService,
    addProductOrdersService,
  },
};
