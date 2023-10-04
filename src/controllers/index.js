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
const { productController } = require('./productController');
const {
  getOrderAddressController,
  addOrderAddressController,
  addProductOrderController,
  addProductOrdersController,
  checkoutSuccessController,
} = require('./orderController');

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
  orderController: {
    getOrderAddressController,
    addOrderAddressController,
    addProductOrderController,
    addProductOrdersController,
    checkoutSuccessController,
  },
  productController: {
    productController,
  },
};
