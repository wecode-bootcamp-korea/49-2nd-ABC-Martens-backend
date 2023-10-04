const { orderDao } = require('../models');
const { generateOrderNumber } = require('../utils');
const {
  getOrderAddressByUserId,
  addOrderAddress,
  productOrderTransaction,
  productOrdersTransaction,
  orderCheckoutDao,
} = orderDao;
const { throwError, axios } = require('../utils');

const getOrderAddressService = (id) => {
  return getOrderAddressByUserId(id);
};

const addOrderAddressService = (data) => {
  return addOrderAddress(data);
};

const addProductOrderService = async (data) => {
  const orderNo = generateOrderNumber();
  return await productOrderTransaction({ ...data, orderNo });
};

const addProductOrdersService = async (data) => {
  const orderNo = generateOrderNumber();
  return await productOrdersTransaction({ ...data, orderNo });
};

const orderCheckoutService = async ({ paymentKey, orderId, amount }) => {
  var options = {
    method: 'POST',
    url: 'https://api.tosspayments.com/v1/payments/confirm',
    headers: {
      Authorization: `Basic ${process.env.TOSSPAYMENT_SECRET_BASE64}`,
      'Content-Type': 'application/json',
    },
    data: { paymentKey, amount, orderId },
  };
  axios
    .request(options)
    .then((resData) => {
      const { orderId, totalAmount, method } = resData;
      const data = { orderNo: orderId, priceAmount: totalAmount, method };
      orderCheckoutDao(data);
      return {
        message: 'ok',
        orderId,
      };
    })
    .catch((err) => {
      console.error(err);
      throwError(500, 'integration server error');
    });
};

module.exports = {
  getOrderAddressService,
  addOrderAddressService,
  addProductOrderService,
  addProductOrdersService,
  orderCheckoutService,
};
