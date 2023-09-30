const { isEmpty } = require('lodash');
const { throwError } = require('../utils');
const { cartService } = require('../services');
const {
  getCartProductByUserIdService,
  addProductCartService,
  addProductCartsService,
} = cartService;

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

const addProductCartController = async (req, res, next) => {
  try {
    const { id } = req.userData;
    const { productId } = req.params;
    const { color, quantity, size } = req.body;
    if (!productId || !color || !quantity || !size)
      throwError(400, 'key error');
    const message = await addProductCartService({
      id,
      productId,
      ...req.body,
    });
    if (message === 'ok') {
      return res.status(201).json({ message: 'product added' });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const addProductCartsController = async (req, res, next) => {
  try {
    const { id } = req.userData;
    const { productList } = req.body;
    if (isEmpty(productList)) throwError(400, 'key error');
    const { productId, size, quantity, color } = productList[0];
    if (!productId || !size || !quantity || !color)
      throwError(400, 'key error');
    const message = await addProductCartsService({ id, ...req.body });
    if (message === 'ok') {
      return res.status(201).json({ message: 'product added' });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  getCartProductByUserIdController,
  addProductCartController,
  addProductCartsController,
};
