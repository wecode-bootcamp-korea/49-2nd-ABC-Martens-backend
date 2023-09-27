const { getUserIdByEmailService, createUserService } = require('./userService');
const { getCartProductByUserIdService } = require('./cartService');

module.exports = {
  userService: {
    getUserIdByEmailService,
    createUserService,
  },
  cartService: {
    getCartProductByUserIdService,
  },
};
