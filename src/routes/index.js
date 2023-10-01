const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const orderRouter = require('./orderRouter');

router.use('/users', userRouter);
router.use('/carts', cartRouter);
router.use('/orders', orderRouter);

module.exports = router;
