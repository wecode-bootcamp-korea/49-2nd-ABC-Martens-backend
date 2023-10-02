const { getUserIdByEmailService, createUserService } = require('./userService');
const {
  getCartProductByUserIdService,
  addProductCartService,
  addProductCartsService,
} = require('./cartService');

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
};
