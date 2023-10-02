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
  productReader
} = require('./productService');

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
    productReader
  }
};
