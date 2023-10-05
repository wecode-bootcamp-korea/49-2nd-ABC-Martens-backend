const { dataSource } = require('./dataSource');
const { throwError } = require('../utils');

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

const imageLoader = async (id) => {
  try {
    const imageViewer = await dataSource.query(
      `SELECT detail_image_url, thumbnail_image_url, is_thumbnail FROM product_images WHERE product_id = ${id}`,
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
      `SELECT color_id, quantity, size FROM options WHERE product_id = ${id}`,
    );
    return optionViewer;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const colorLoader = async (id) => {
  try {
    const color_id = optionSelector.color_id; //색상만을 불러옵니다.
    const colorViewer = await dataSource.query(
      `SELECT color FROM colors WHERE color_id = ${color_id}`,
    );
    return colorViewer;
  } catch (err) {
    console.error(err);
    next(err);
  }
};


module.exports = {
  introducer,
  colorLoader,
  option,
  imageLoader,
};
