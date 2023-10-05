const { throwError } = require('../utils');
const { dataSource } = require('./dataSource');

const getProductByUserIdDao = async (id) => {
  const result = await dataSource.query(
    ` SELECT 
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
      colors.color,
      product_carts.quantity, 
      product_carts.product_option_id AS productOptionId
    FROM 
      products
    LEFT JOIN
        product_images ON products.id = product_images.product_id
    LEFT JOIN 
      options ON products.id = options.product_id
    LEFT JOIN 
      colors ON options.color_id = colors.id
    LEFT JOIN 
      product_carts ON options.id = product_carts.product_option_id  
    LEFT JOIN users ON product_carts.user_id = users.id
    WHERE users.id = ? AND (product_carts.is_deleted IS NULL OR product_carts.is_deleted != 1)
    ORDER BY product_carts.updated_at ASC
          `,
    [id],
  );
  return result;
};

const addProductToCartQuery = `
    quantity = VALUES(quantity) + product_carts.quantity,
  `;

const updateProductInCartQuery = `
    quantity = VALUES(quantity),
`;

/**
 * @function productCartTransaction - 장바구니에 단일 상품 추가/수정시 발생하는 트랜잭션 함수
 * @param {object} data - {id: number, productId: number, color: string, quantity: number, size: number}
 * @returns string
 */
const productCartTransaction = async ({
  id,
  productId,
  productOptionId,
  size,
  quantity,
  color,
  isDeleted,
  method,
}) => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const [colorId] = await queryRunner.query(
      `SELECT id FROM colors WHERE color = ?`,
      [color],
    );
    const [optionId] = await queryRunner.query(
      `SELECT id FROM options WHERE product_id = ? AND color_id = ? AND size = ?`,
      [productId, colorId.id, parseInt(size)],
    );

    if (method === 'PATCH' && productOptionId) {
      await queryRunner.query(
        `UPDATE product_carts SET is_deleted = 1  WHERE product_option_id = ?
        `,
        [productOptionId],
      );
    }
    const sql = `
    INSERT INTO product_carts (user_id, product_option_id, quantity, is_deleted, deleted_at)
    VALUES (?, ?, ?, ?, ${isDeleted === 'Y' ? 'CURRENT_TIMESTAMP' : null})
    ON DUPLICATE KEY UPDATE 
      ${method === 'POST' ? addProductToCartQuery : updateProductInCartQuery},
      is_deleted = VALUES(is_deleted);    
    `;

    await queryRunner.query(sql, [id, optionId.id, quantity, isDeleted]);
    await queryRunner.commitTransaction();
    return 'ok';
  } catch (err) {
    console.error(err);
    await queryRunner.rollbackTransaction();
    throwError(500, 'transaction failed');
  } finally {
    await queryRunner.release();
  }
};

/**
 * @function productCartsTransaction - 장바구니에 상품 추가/수정시 발생하는 트랜잭션 함수
 * @param {object[]} data - {id: number, productList: [{productId: number, color: string, quantity: number, size: number}]}
 * @returns string
 */
const productCartsTransaction = async ({ id, productList, method }) => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const colors = productList.map((item) => item.color);
    const sizes = productList.map((item) => item.size);
    const productIds = productList.map((item) => item.productId);
    const isDeletedList = productList.map((item) => ({
      productOptionId: item.productOptionId,
      productId: item.productId,
      size: item.size,
      color: item.color,
      isDeleted: item.isDeleted,
    }));
    const productOptionIds = productList.map((item) => item.productOptionId);

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
        const isDeletedElement = isDeletedList.find(
          (d) =>
            d.productId === item.productId &&
            d.size === item.size &&
            d.color === item.color,
        ).isDeleted;

        return `(${id}, ${optionId}, ${item.quantity}, ${
          isDeletedElement === 'Y' ? 1 : null
        })`;
      })
      .join(', ');

    if (method === 'PATCH' && productOptionIds) {
      await queryRunner.query(
        `
          UPDATE product_carts
          SET is_deleted = 1
          WHERE product_option_id IN (?)
        `,
        [productOptionIds],
      );
    }

    const sql = `
    INSERT INTO product_carts (user_id, product_option_id, quantity, is_deleted)
    VALUES ${values}
    ON DUPLICATE KEY UPDATE quantity = VALUES(quantity) + product_carts.quantity,
    is_deleted = VALUES(is_deleted), 
    deleted_at = CASE WHEN VALUES(is_deleted) = 1 THEN CURRENT_TIMESTAMP ELSE product_carts.deleted_at END
    `;

    await queryRunner.query(sql);
    await queryRunner.commitTransaction();
    return 'ok';
  } catch (err) {
    console.error(err);
    await queryRunner.rollbackTransaction();
    throwError(500, 'transaction failed');
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  getProductByUserIdDao,
  productCartTransaction,
  productCartsTransaction,
};
