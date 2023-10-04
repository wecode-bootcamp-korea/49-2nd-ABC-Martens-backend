const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const detail = productController.detail;

router.get('/detail/:id', productController.detail);

module.exports = router;
