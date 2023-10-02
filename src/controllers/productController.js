const { generateToken, throwError } = require('../utils');
const productService = require('../services/productService');

const detail = async (req, res) => {
  const { id } = req.params;
  const productReader = await productService.productReader(Number(id), res);
  return res.status(200).json(productReader);
};


module.exports = {
  detail
};