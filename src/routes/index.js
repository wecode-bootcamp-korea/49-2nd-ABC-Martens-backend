const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const allProductRouter = require('./allProductRouter');

router.use('/users', userRouter);
router.use('/carts', cartRouter);
router.use('/products', allProductRouter);

const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');

router.use('/users', userRouter);
router.use('/carts', cartRouter);
router.use('/products', allProductRouter);
router.use('/goods', productRouter);
router.use('/orders', orderRouter);

module.exports = router;
