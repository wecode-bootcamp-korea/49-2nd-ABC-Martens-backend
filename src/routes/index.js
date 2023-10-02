const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const productRouter = require('./productRouter');

router.use('/users', userRouter);
router.use('/carts', cartRouter);
router.use('/products', productRouter);

module.exports = router;