const { dataSource } = require('./dataSource');
const express = require('express');
const app = express();
app.use(express.json());

const selector = async (id) => {
  const selectorViewer = await dataSource.query(
    `SELECT id  FROM products WHERE id = ${id}`,
  );
  console.log('DAO: PRODUCT_SELECTED_SUCCESSFULLY');
  return JSON.parse(JSON.stringify(selectorViewer));
};

const introducer = async (id) => {
  const introducerViewer = await dataSource.query(
    `SELECT product_name, price, original_price FROM products WHERE id = ${id}`,
  );
  console.log('DAO: PRODUCT_READ_SUCCESSFULLY');
  return JSON.parse(JSON.stringify(introducerViewer));
};

const imageLoader = async (id) => {
  const imageViewer = await dataSource.query(
    `SELECT detail_image_url, thumbnail_image_url thumbnail_image_url, is_thumbnail FROM product_images WHERE product_id = ${id}`,
  );
  // return res.status(200).json(imageViewer);
  console.log('DAO: IMAGE_READ_SUCCESSFULLY');
  return JSON.parse(JSON.stringify(imageViewer));
};

const option = async (id) => {
  const optionViewer = await dataSource.query(
    `SELECT color_id, quantity, size FROM options WHERE product_id = ${id}`,
  );
  console.log('DAO: OPTION_READ_SUCCESSFULLY');
  return JSON.parse(JSON.stringify(optionViewer));
};

const colorLoader = async (id) => {
  const color_id = optionSelector.color_id; //색상만을 불러옵니다.
  const colorViewer = await dataSource.query(
    `SELECT color FROM colors WHERE color_id = ${color_id}`,
  );
  console.log('DAO: COLOR_READ_SUCCESSFULLY');
  return JSON.parse(JSON.stringify(colorViewer));
};

const price = async (id) => {
  const priceViewer = await dataSource.query(
    `SELECT price, original_price FROM products WHERE id = ${id}`,
  );
  console.log('DAO: PRICE_READ_SUCCESSFULLY');
  return JSON.parse(JSON.stringify(priceViewer));
};

const productDeleter = async (id) => {
  await req.dataSource.query(`DELETE * FROM products WHERE id = ${id}`);
  console.log('DAO: PRODUCT_DELETED_SUCCESSFULLY');
  return JSON.parse("DAO: PRODUCT DELETED")
};

const optionDeleter = async (id) => {
  await req.dataSource.query(`DELETE * FROM options WHERE product_id = ${id}`);
  console.log('DAO: PRODUCT_OPTION_DELETED_SUCCESSFULLY');
  return JSON.parse("DAO: OPTION DELETED")
};

const imageDeleter = async (id) => {
  await req.dataSource.query(`DELETE * FROM product_images WHERE product_id = ${id}`);
  console.log('DAO: PRODUCT_IMAGES_DELETED_SUCCESSFULLY');
  return JSON.parse("DAO: IMAGE DELETED")
};

const productCreator = async (req) => {
  await req.dataSource.query(`INSERT INTO products ('product_name', 'price', 'original_price', 'products_description') VALUES $(product_name), $(price), $(original_price), $(product_description)`)
  return JSON.parse("PRODUCT_CREATED")
}



module.exports = {
  productCreator,
  
  selector,
  introducer,
  price,
  colorLoader,
  option,
  imageLoader,

  imageDeleter,
  productDeleter,
  optionDeleter,
};
