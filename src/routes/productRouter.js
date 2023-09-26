const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const detailParcer = productController.detail;

//상세페이지 관련 기능입니다.
router.get("/detailParcer", productController.detail);

router.post(
    "/productCreator", 
    productController.create
);

router.post(
    "/productDeleter", 
    productController.deleter
);

module.exports = {

    router

}

