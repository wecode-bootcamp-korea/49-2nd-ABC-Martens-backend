const productDao = require('../models/productDao');
const { selector, introducer, imageLoader, option, price } = productDao;

const productReader = async (id) => {
  try {
    const productSelector = await productDao.selector(id);
    const productIntroducer = await productDao.introducer(id);
    const imageSelector = await productDao.imageLoader(id);
    const optionSelector = await productDao.option(id);
    const priceSelector = await productDao.price(id);

    const responseReader = {
      product: productSelector,
      introduction: productIntroducer,
      images: imageSelector,
      options: optionSelector,
      price: priceSelector,
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
