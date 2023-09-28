const { socialLoginController } = require('./userController');
const {
  getCartProductByUserIdController,
  addProductCartsController,
} = require('./cartController');

module.exports = {
  userController: { socialLoginController },
  cartController: {
    getCartProductByUserIdController,
    addProductCartsController,
  },
};
