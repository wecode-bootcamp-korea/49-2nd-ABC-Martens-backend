const { generateToken, throwError } = require('../utils');
const { throwError } = require('../utils');
const productService = require('../services/productService');


const detail = async (req, res) => {
  try {
    const { id } = req.params;
    const productReader = await productService.productReader(Number(id));
    return res.status(200).json({ productReader });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  detail,
};
