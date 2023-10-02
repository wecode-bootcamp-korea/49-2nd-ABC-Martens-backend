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
const { 
  productController 
} = require('./productController');

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
  productController: { 
    productController 
  }
};
