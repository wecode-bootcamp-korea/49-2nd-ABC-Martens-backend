const { dataSource } = require('./dataSource');

const selector = async (id) => {
  const selectorViewer = await dataSource.query(
    `SELECT id  FROM products WHERE id = ${id}`,
  );
  return selectorViewer;
};

const introducer = async (id) => {
  const introducerViewer = await dataSource.query(
    `SELECT product_name, price, original_price FROM products WHERE id = ${id}`,
  );
  return introducerViewer;
};

const imageLoader = async (id) => {
  const imageViewer = await dataSource.query(
    `SELECT detail_image_url, thumbnail_image_url thumbnail_image_url, is_thumbnail FROM product_images WHERE product_id = ${id}`,
  );
  return imageViewer;
};

const option = async (id) => {
  const optionViewer = await dataSource.query(
    `SELECT product_id, color_id, quantity, size FROM options WHERE product_id = ${id}`,
  );
  return optionViewer;
};

const colorLoader = async (id) => {
  const color_id = optionSelector.color_id; //색상만을 불러옵니다.
  const colorViewer = await dataSource.query(
    `SELECT color FROM colors WHERE color_id = ${color_id}`,
  );
  return colorViewer;
};

const price = async (id) => {
  const priceViewer = await dataSource.query(
    `SELECT price, original_price FROM products WHERE id = ${id}`,
  );
  return priceViewer;
};

module.exports = {
  selector,
  introducer,
  price,
  colorLoader,
  option,
  imageLoader
};
