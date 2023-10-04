const { isEmpty } = require('lodash');
const { orderService } = require('../services');
const { throwError } = require('../utils');
const {
  getOrderAddressService,
  addProductOrderService,
  addProductOrdersService,
  addOrderAddressService,
  orderCheckoutService,
} = orderService;

const getOrderAddressController = async (req, res, next) => {
  try {
    const { id } = req.userData;
    const address = await getOrderAddressService(id);
    if (address) {
      return res.status(200).json({
        data: await getOrderAddressService(id),
      });
    }
    throwError(400, "address doesn't exist");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const addOrderAddressController = async (req, res, next) => {
  try {
    const { id } = req.userData;
    const { orderName, detailAddress, streetAddress, zipCode } = req.body;
    if (!orderName || !detailAddress || !streetAddress || !zipCode)
      throwError(400, 'key error');
    const message = await addOrderAddressService({ id, ...req.body });
    if (message) {
      return res.status(201).json({
        message,
      });
    }
    throwError(400);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const addProductOrderController = async (req, res, next) => {
  try {
    const { id } = req.userData;
    const { productOptionId } = req.params;
    const { quantity, addressId } = req.body;
    if (!quantity || !addressId) throwError(400, 'key error');
    const message = await addProductOrderService({
      id,
      productOptionId,
      ...req.body,
    });
    if (message) {
      res.json(201).status({
        message,
      });
    }
    throwError(400);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const addProductOrdersController = async (req, res, next) => {
  try {
    const { id } = req.userData;
    const { productList, addressId } = req.body;
    if (isEmpty(productList) || !addressId) throwError(400, 'key error');
    const message = await addProductOrdersService({ id, ...req.body });
    if (message) {
      res.status(201).json(message);
    }
    throwError(400);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const checkoutSuccessController = async (req, res, next) => {
  try {
    const result = await orderCheckoutService({ ...req.query });
    if (result.message === 'ok')
      res.redirect(
        `${process.env.CLIENT_URI}/orders/checkout/complete?orderNo=${result.orderNo}`,
      );
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  getOrderAddressController,
  addOrderAddressController,
  addProductOrderController,
  addProductOrdersController,
  getCheckoutController,
  checkoutSuccessController,
  checkoutFailController,
};
