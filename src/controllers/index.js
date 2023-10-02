const {
  socialLoginController,
  getVerificationCodeController,
  setNewPasswordController,
} = require('./userController');
const {
  getCartProductByUserIdController,
  addProductCartController,
  addProductCartsController,
} = require('./cartController');

module.exports = {
  userController: {
    socialLoginController,
    getVerificationCodeController,
    setNewPasswordController
    },
  cartController: {
    getCartProductByUserIdController,
    addProductCartController,
    addProductCartsController
  },
};
