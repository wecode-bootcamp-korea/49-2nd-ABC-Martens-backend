const { socialLoginController } = require('./userController');
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
} = require('./orderController');

module.exports = {
  userController: { socialLoginController },
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
  },
};
