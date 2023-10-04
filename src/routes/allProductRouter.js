const express = require('express');
const router = express.Router();

const { allProductController } = require('../controllers');

const { allProduct } = allProductController;

router.get('/', allProduct);

module.exports = router;
