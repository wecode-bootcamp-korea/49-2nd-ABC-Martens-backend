const { socialLoginController } = require('./userController');
const { productController } = require('./productController');


module.exports = {
  userController: { socialLoginController },
  productController: { productController }
};
