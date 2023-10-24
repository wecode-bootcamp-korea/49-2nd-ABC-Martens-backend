const express = require('express');
const router = express.Router();
const { tokenVerification } = require('../middlewares');
const { cartController } = require('../controllers');
const {
  getCartProductByUserIdController,
  addProductCartController,
  addProductCartsController,
} = cartController;

router.get('/', tokenVerification, getCartProductByUserIdController);
router.post('/', tokenVerification, addProductCartsController);
router.patch('/', tokenVerification, addProductCartsController);

router.post('/:productId', tokenVerification, addProductCartController);
router.patch('/:productId', tokenVerification, addProductCartController);

module.exports = router;
