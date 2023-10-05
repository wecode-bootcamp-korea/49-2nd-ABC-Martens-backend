const { dataSource } = require('./dataSource');
const { throwError } = require('../utils');

const productSaved = async (id) => {
  const productCheck = await dataSource.query(
    `SELECT id FROM products WHERE id = ${id}`
  );
  console.log(productCheck)
  return productCheck;
}

const introducer = async (id) => {
  try {
    const introducerViewer = await dataSource.query(
      `SELECT id, product_name, price, original_price, products_description FROM products WHERE id = ${id}`,
    );
    return introducerViewer;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const detailImageLoader = async (id) => {
  try {
    const detailImageViewer = await dataSource.query(
      `SELECT detail_image_url FROM product_images WHERE product_id = ${id}`,
    );
    return detailImageViewer;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const imageLoader = async (id) => {
  try {
    const imageViewer = await dataSource.query(
      `SELECT thumbnail_image_url, is_thumbnail FROM product_images WHERE product_id = ${id}`,
    );
    return imageViewer;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const option = async (id) => {
  try {
    const optionViewer = await dataSource.query(
      `SELECT color_id, quantity, size, colors.color AS colorName FROM options
      LEFT JOIN colors ON options.color_id = colors.id WHERE product_id = ${id}`,
    );
    return optionViewer;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const colors = async (id) => {
  try {
    const colorViewer = await dataSource.query(
      `SELECT DISTINCT color_id, colors.color AS colorName FROM options
      LEFT JOIN colors ON options.color_id = colors.id WHERE product_id = ${id}`,
    );
    return colorViewer;
  } catch (err) {
    console.error(err);
    next(err);
  }
};


module.exports = {
  introducer,
  option,
  colors,
  detailImageLoader,
  imageLoader,
  productSaved
};
