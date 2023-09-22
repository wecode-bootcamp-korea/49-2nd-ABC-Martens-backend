const express = require('express');
const productController = require('../services/productDetail');
const app = require('express');
const router = express.router();


router.get("/productDetails", productController.detail);

ㅎ
module.exports = {

    router

}

