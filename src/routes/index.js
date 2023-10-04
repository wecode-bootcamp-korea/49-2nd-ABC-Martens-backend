const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const allProductRouter = require('./allProductRouter');
const orderRouter = require('./orderRouter');

router.use('/users', userRouter);
router.use('/carts', cartRouter);
router.use('/products', allProductRouter);
router.use('/orders', orderRouter);

module.exports = router;
