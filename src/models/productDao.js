const { dataSource } = require('./dataSource');
const express = require('express');
  const app = express();
  app.use(express.json()); 

const selector = async (id) => {
  await dataSource.query(
    `SELECT ( id ) FROM products WHERE id = ${id}`,
  );
  console.log('PRODUCT_SELECTED_SUCCESSFULLY');
};

const introducer = async (id) => {
  await dataSource.query(
    `SELECT ( id, product_name, price, original_price ) FROM products WHERE id = ${id}`,
  );
  console.log('DAO: PRODUCT_READ_SUCCESSFULLY');
};

const imageLoader = async (id) => {
  await dataSource.query(
    `SELECT ( detail_image_url, thumbnail_image_url ) FROM product_images WHERE product_id = ${id}`,
  );
  console.log('DAO: IMAGE_READ_SUCCESSFULLY');
};

const option = async (id) => {
  await dataSource.query(
    `SELECT ( quanity, size, color_id ) FROM options WHERE product_id = ${id}`,
  );
  console.log('DAO: OPTION_READ_SUCCESSFULLY');
};

const colorLoader = async (id) => {
  const color_id = optionSelector.color_id; //색상만을 불러옵니다.
  const colorViewer = await dataSource.query(
    `SELECT ( color ) FROM colors WHERE color_id = ${color_id}`,
  );
  console.log('DAO: COLOR_READ_SUCCESSFULLY');
};

const price = async (id) => {
  await dataSource.query(
    `SELECT ( price, original_price ) FROM products WHERE product_id = ${id}`,
  );
  console.log('DAO: PRICE_READ_SUCCESSFULLY');
};

const productDeleter = async (id) => {
  await req.dataSource.query(`DELETE * FROM products WHERE id = ${id}`);
  console.log('DAO: PRODUCT_DELETED_SUCCESSFULLY');
};

const optionDeleter = async (id) => {
  await req.dataSource.query(`DELETE * FROM options WHERE id = ${id}`);
  console.log('DAO: PRODUCT_OPTION_DELETED_SUCCESSFULLY');
};

const imageDeleter = async (id) => {
  await req.dataSource.query(`DELETE * FROM product_images WHERE id = ${id}`);
  console.log('DAO: PRODUCT_IMAGES_DELETED_SUCCESSFULLY');
};

module.exports = {
  selector,
  introducer,
  price,
  colorLoader,
  option,
  imageLoader,

  imageDeleter,
  productDeleter,
  optionDeleter
};
