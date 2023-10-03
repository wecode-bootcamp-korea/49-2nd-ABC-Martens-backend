const express = require('express');
const router = express.Router();
const { tokenVerification } = require('../middlewares');
const { orderController } = require('../controllers');
const {
  getOrderAddressController,
  addOrderAddressController,
  addProductOrderController,
  addProductOrdersController,
  checkoutSuccessController,
} = orderController;

router.get('/address', tokenVerification, getOrderAddressController);
router.post('/address', tokenVerification, addOrderAddressController);

router.post('/:productOptionId', tokenVerification, addProductOrderController);
router.post('/', tokenVerification, addProductOrdersController);

router.get('/checkout/callback/success', checkoutSuccessController);

module.exports = router;
