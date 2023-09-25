const express = require('express');
const productController = require('../services/productDetail');
const app = require('express');
const router = express.router();

//상세페이지 관련 기능입니다.
router.get("/productDetail", productController.detail);
router.post("/productCreator", productController.create);
// router.put("/productDetail", productController.update);
router.post("/productDeleter", productController.deleter);

ㅎ
module.exports = {

    router

}

