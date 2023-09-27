const { throwError } = require('../utils');
const { cartService } = require('../services');
const { getCartProductByUserIdService } = cartService;

const getCartProductByUserIdController = async (req, res, next) => {
  try {
    const { id } = req.userData;
    const productData = await getCartProductByUserIdService(id);
    if (productData && productData.length) {
      return res.status(200).json({
        data: productData,
      });
    }
    throwError(400, 'no data');
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  getCartProductByUserIdController,
};
