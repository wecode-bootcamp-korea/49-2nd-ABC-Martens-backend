const express = require('express');
const router = express.Router();
const { tokenVerification } = require('../middlewares');
const { cartController } = require('../controllers');
const { getCartProductByUserIdController, addProductCartsController } =
  cartController;

router.get('/', tokenVerification, getCartProductByUserIdController);
router.post('/', tokenVerification, addProductCartsController);
router.patch('/', tokenVerification, addProductCartsController);

module.exports = router;
