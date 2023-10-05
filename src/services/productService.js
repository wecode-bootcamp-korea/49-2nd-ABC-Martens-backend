const productDao = require('../models/productDao');
const { throwError } = require('../utils');
const { selector, introducer, imageLoader, option, price, detailImageLoader, colors } = productDao;

const productReader = async (id) => {
  try {
    const productIntroducer = await productDao.introducer(id);
      const productId = productIntroducer[0].id;
      const productName = productIntroducer[0].product_name;
      const price = productIntroducer[0].price;
      const orignialPrice = productIntroducer[0].original_price;
      const productDescription = productIntroducer[0].products_description;
      const salesPercentage = ((1 - price/orignialPrice)*100);
      const salesPricePercentage = Math.round(salesPercentage);
    const imageSelector = await productDao.imageLoader(id);
      const thumbnailImageUrl =imageSelector[0].thumbnail_image_url;
      const isThumbnail = imageSelector[0].is_thumbnail;
    const optionSelector = await productDao.option(id);
    const colorSelector = await productDao.colors(id);
    // const colorsName = optionSelector[0].colorName;
      // const colorNumber = optionSelector[0].color_id;
    const detailImageSelector = await productDao.detailImageLoader(id); 

    const data = {
      productId,
      productName,
      colorSelector,
      price,
      orignialPrice,
      salesPricePercentage,
      productDescription,
      detailImageSelector,
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
