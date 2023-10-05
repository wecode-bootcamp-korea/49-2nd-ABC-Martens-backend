const productDao = require('../models/productDao');
const { throwError } = require('../utils');
const { selector, introducer, imageLoader, option, price } = productDao;

const productReader = async (id) => {
  try {
    const productIntroducer = await productDao.introducer(id);
      const productId = productIntroducer[0].id;
      const productName = productIntroducer[0].product_name;
      const price = productIntroducer[0].price;
      const orignialPrice = productIntroducer[0].original_price;
    const imageSelector = await productDao.imageLoader(id);
      const detailImageUrl = imageSelector[0].detail_image_url;
      const thumbnailImageUrl =imageSelector[0].thumbnail_image_url;
      const isThumbnail = imageSelector[0].is_thumb_nail
    const optionSelector = await productDao.option(id);

    const data = {
      productId,
      productName,
      price,
      orignialPrice,
      detailImageUrl,
      thumbnailImageUrl,
      isThumbnail,
      options: optionSelector,
    };

    return data;

  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  productReader,
};
