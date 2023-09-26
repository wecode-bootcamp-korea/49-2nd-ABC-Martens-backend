const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const detail = productController.detail;

//상세페이지 관련 기능입니다.
router.get('/detail/:id', productController.detail);
router.get('/delete/:id', productController.deleter);

module.exports = router;
