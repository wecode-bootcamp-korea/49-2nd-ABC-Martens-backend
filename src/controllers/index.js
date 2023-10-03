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

const { allProduct } = require('./allProductController');

module.exports = {
  userController: {
    socialLoginController,
    getVerificationCodeController,
    setNewPasswordController,
  },
  cartController: {
    getCartProductByUserIdController,
    addProductCartController,
    addProductCartsController,
  },
  allProductController: {
    allProduct,
  },
};
