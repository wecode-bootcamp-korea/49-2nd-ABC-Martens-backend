const { getUserIdByEmailService, createUserService } = require('./userService');
const {
  getCartProductByUserIdService,
  addProductCartsService,
} = require('./cartService');

module.exports = {
  userService: {
    getUserIdByEmailService,
    createUserService,
  },
  cartService: {
    getCartProductByUserIdService,
    addProductCartsService,
  },
};
