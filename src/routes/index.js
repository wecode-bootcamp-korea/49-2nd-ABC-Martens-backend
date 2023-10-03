const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const allProductRouter = require('./allProductRouter');

router.use('/users', userRouter);
router.use('/carts', cartRouter);
router.use('/products', allProductRouter);

module.exports = router;
