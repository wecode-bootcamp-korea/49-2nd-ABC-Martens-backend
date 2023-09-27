const { socialLoginController } = require('./userController');
const { getCartProductByUserIdController } = require('./cartController');

module.exports = {
  userController: { socialLoginController },
  cartController: {
    getCartProductByUserIdController,
  },
};
