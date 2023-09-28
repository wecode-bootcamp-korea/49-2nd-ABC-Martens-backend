const { throwError } = require('../utils');
const { dataSource } = require('./dataSource');

const getProductByUserIdDao = async (id) => {
  const result = await dataSource.query(
    ` 
      SELECT 
      products.id AS productId, 
      products.product_name AS productName,
      products.price * COALESCE(product_carts.quantity, 1) AS totalPrice,
      (CASE 
        WHEN products.original_price IS NULL OR products.original_price = 0 THEN 0
        ELSE ROUND((products.original_price - price) / products.original_price * 100) 
       END) AS salePercentage,
      products.price AS price,
      product_images.thumbnail_image_url AS productThumbnail,
      options.size,
      product_carts.quantity
    FROM 
      products
    LEFT JOIN
        product_images ON products.id = product_images.product_id
    LEFT JOIN 
      options ON products.id = options.product_id
    LEFT JOIN 
      product_carts ON options.id = product_carts.product_option_id
    LEFT JOIN users ON product_carts.user_id = users.id
    WHERE users.id = ?
          `,
    [id],
  );
  return result;
};

/**
 * productCartsTransaction - 장바구니에 상품 추가/수정시 발생하는 트랜잭션 함수
 * @param {object[]} data - {id: number, productList: [{id: number, productId: number, color: string, quantity: number, size: number}]}
 * @returns string
 */
const productCartsTransaction = async (data) => {
  const { id, productList } = data;

  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const colors = productList.map((item) => item.color);
    const sizes = productList.map((item) => item.size);
    const productIds = productList.map((item) => item.productId);

    const colorIdsResult = await queryRunner.query(
      `SELECT id, color FROM colors WHERE color IN (?)`,
      [colors],
    );
    const optionIdsResult = await queryRunner.query(
      `SELECT id, product_id, color_id, size  FROM options WHERE product_id IN (?) AND color_id IN (?) AND size IN (?)`,
      [productIds, colorIdsResult.map((color) => color.id), sizes],
    );
    const values = productList
      .map((item) => {
        const colorId = colorIdsResult.find((c) => c.color === item.color).id;
        const optionId = optionIdsResult.find(
          (o) =>
            o.product_id === item.productId &&
            o.color_id === colorId &&
            o.size === parseInt(item.size),
        ).id;
        return `(${id}, ${optionId}, ${item.quantity})`;
      })
      .join(', ');

    const sql = `
    INSERT INTO product_carts (user_id, product_option_id, quantity)
    VALUES ${values}
    ON DUPLICATE KEY UPDATE quantity = VALUES (quantity) + product_carts.quantity
    `;

    await queryRunner.query(sql);
    await queryRunner.commitTransaction();
    return 'ok';
  } catch (err) {
    console.error(err);
    await queryRunner.rollbackTransaction();
    throwError(500, 'transaction Error');
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  getProductByUserIdDao,
  productCartsTransaction,
};
