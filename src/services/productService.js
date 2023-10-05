const productDao = require('../models/productDao');
const { throwError } = require('../utils');
const { selector, introducer, imageLoader, option, price } = productDao;

const productReader = async (id) => {
  try {
    const productIntroducer = await productDao.introducer(id);
    const imageSelector = await productDao.imageLoader(id);
    const optionSelector = await productDao.option(id);

    const responseReader = {
      productIntroducer,
      imageSelector,
      options: optionSelector,
    };

    return responseReader;

  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  productReader,
};
