const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const detail = productController.detail;
const deleter = productController.deleter;
const creator = productController.creator;

//상세페이지 관련 기능입니다.
router.get('/detail/:id', productController.detail);

module.exports = router;


http:///localhost:8000/product/detail/1

// router.post('/delete/:id', productController.deleter);
// router.post(`/creator`, productController.creator);