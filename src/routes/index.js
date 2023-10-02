const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
<<<<<<< HEAD
const productRouter = require('./productRouter');

router.use('/users', userRouter);
router.use('/products', productRouter);
=======
const cartRouter = require('./cartRouter');

router.use('/users', userRouter);
router.use('/carts', cartRouter);
>>>>>>> dev

module.exports = router;
