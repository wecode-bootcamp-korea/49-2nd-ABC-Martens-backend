const express = require('express');
const app = express();
app.use(express.json());

const productDao = require('../models/productDao');
const selector = productDao.selector;
const introducer = productDao.introducer;
const imageLoader = productDao.imageLoader;
const option = productDao.option;
const price = productDao.price;
const productCreator = productDao.productCreator;

const productReader = async (id) => {
  const productSelector = await productDao.selector(id);
  const productIntroducer = await productDao.introducer(id);
  const imageSelector = await productDao.imageLoader(id);
  const optionSelector = await productDao.option(id);
  const priceSelector = await productDao.price(id);

  console.log('SERVICE: PASSED_TO_DAO_SUCCESSFULLY');

  const responseReader = {
    product: productSelector,
    introduction: productIntroducer,
    images: imageSelector,
    options: optionSelector,
    price: priceSelector,
  };

  console.log('SERVICE: RECEIVED_FROM_DAO_SUCCESSFULLY');

  return responseReader;
};

module.exports = {
  productReader
};
