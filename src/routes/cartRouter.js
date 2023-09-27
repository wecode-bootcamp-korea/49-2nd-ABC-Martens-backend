const express = require('express');
const router = express.Router();
const { tokenVerification } = require('../middlewares');
const { cartController } = require('../controllers');
const { getCartProductByUserIdController } = cartController;

router.get('/', tokenVerification, getCartProductByUserIdController);

module.exports = router;
