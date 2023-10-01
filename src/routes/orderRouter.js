const express = require('express');
const router = express.Router();
const { tokenVerification } = require('../middlewares');
const { orderController } = require('../controllers');
const {
  getOrderAddressController,
  addOrderAddressController,
  addProductOrderController,
  addProductOrdersController,
} = orderController;

router.get('/address', tokenVerification, getOrderAddressController);
router.post('/address', tokenVerification, addOrderAddressController);

router.post('/:productOptionId', tokenVerification, addProductOrderController);
router.post('/', tokenVerification, addProductOrdersController);

module.exports = router;
