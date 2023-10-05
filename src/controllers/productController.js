const { generateToken, throwError } = require('../utils');
const productService = require('../services/productService');

const detail = async (req, res) => {
  try {
    const { id } = req.params;
    const productReader = await productService.productReader(Number(id));

    const extractProductDetails = (productReader) => {
      const productId = productReader.productIntroducer[0].id;
      const productName = productReader.productIntroducer[0].product_name;
      const price = productReader.productIntroducer[0].price;
      const originalPrice = productReader.productIntroducer[0].original_price;
      const detailImageUrl = productReader.imageSelector[0].detail_image_url;
      const thumbnailImageUrl =
        productReader.imageSelector[0].thumbnail_image_url;
      const isThumbnail = productReader.imageSelector[0].is_thumbnail;
      const option = productReader.options;

      return {
        productId,
        productName,
        price,
        originalPrice,
        detailImageUrl,
        thumbnailImageUrl,
        isThumbnail,
        option,
      };
    };

    return res.status(200).json({ data: extractProductDetails(productReader) });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  detail,
};
