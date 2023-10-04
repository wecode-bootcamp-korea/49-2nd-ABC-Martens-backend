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
  getOrderAddressController,
  addOrderAddressController,
  addProductOrderController,
  addProductOrdersController,
  checkoutSuccessController,
} = require('./orderController');

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
  orderController: {
    getOrderAddressController,
    addOrderAddressController,
    addProductOrderController,
    addProductOrdersController,
    checkoutSuccessController,
  },
};
