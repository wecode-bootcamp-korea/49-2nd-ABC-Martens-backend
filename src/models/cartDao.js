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
      options.size,
      product_carts.quantity
    FROM 
      products
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

module.exports = {
  getProductByUserIdDao,
};
