const { generateToken, throwError } = require('../utils');
const productService = require('../services/productService');
const express = require('express');
const app = express();
app.use(express.json());

const detail = async (req, res) => {
  const { id } = req.params;
  console.log('CONTROLLER: PASSED TO SERVICE SUCCESSFULLY');
  const productReader = await productService.productReader(Number(id), res);
  console.log('CONTROLLER: RECEIVED FROM SERVICE SUCCESSFULLY');
  return res.status(200).json(productReader);
};


module.exports = {
  detail
};