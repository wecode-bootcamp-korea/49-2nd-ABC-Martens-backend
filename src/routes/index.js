const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');

router.use('/users', userRouter);
router.use('/carts', cartRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);

module.exports = router;
