const { dataSource } = require('./dataSource');

const selector = async (id) => {
  try {
    const selectorViewer = await dataSource.query(
      `SELECT id  FROM products WHERE id = ${id}`,
    );
    return selectorViewer;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const introducer = async (id) => {
  try {
    const introducerViewer = await dataSource.query(
      `SELECT product_name, price, original_price FROM products WHERE id = ${id}`,
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
      `SELECT product_id, color_id, quantity, size FROM options WHERE product_id = ${id}`,
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

const price = async (id) => {
  try {
    const priceViewer = await dataSource.query(
      `SELECT price, original_price FROM products WHERE id = ${id}`,
    );
    return priceViewer;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  selector,
  introducer,
  price,
  colorLoader,
  option,
  imageLoader,
};
