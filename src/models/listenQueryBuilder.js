// ranking: 랭킹순(별점 내림차순)
// regist: 신규등록순
// low_price: 낮은가격순
// high_price: 높은가격순
// review: 상품평많은순
// sale: 판매량순(구매 완료 상태 중 구매 아이템의 구매 수량순)

const sortQueryBuilder = async (sub_category_id, category_id, sortBy) => {
  try {
    const orderingSortWhereBuilder = {
      ranking: `WHERE sub_category_id = ${sub_category_id} GROUP BY products.id`,
      regist: `WHERE sub_category_id = ${sub_category_id}`,
      low_price: `WHERE sub_category_id = ${sub_category_id}`,
      high_price: `WHERE sub_category_id = ${sub_category_id}`,
      review: `WHERE sub_category_id = ${sub_category_id} GROUP BY products.id`,
      sale: `WHERE sub_category_id = ${sub_category_id}`,
      '': '',
    };

    if (!sub_category_id) {
      orderingSortWhereBuilder.ranking = `WHERE category_id = ${category_id} GROUP BY products.id`;
      orderingSortWhereBuilder.regist = `WHERE category_id = ${category_id}`;
      orderingSortWhereBuilder.low_price = `WHERE category_id = ${category_id}`;
      orderingSortWhereBuilder.high_price = `WHERE category_id = ${category_id}`;
      orderingSortWhereBuilder.review = `WHERE category_id = ${category_id} GROUP BY products.id`;
      orderingSortWhereBuilder.sale = `WHERE category_id = ${category_id}`;
    }

    const orderingSortWhere = await orderingSortWhereBuilder[sortBy];

    const orderingSortOrderByBuilder = {
      ranking: 'ORDER BY rating DESC, products.id',
      regist: 'ORDER BY created_at DESC, products.id',
      low_price: 'ORDER BY price, products.id',
      high_price: 'ORDER BY price DESC, products.id',
      review: 'ORDER BY review DESC, products.id',
      sale: 'ORDER BY total_sales DESC, products.id',
      '': '',
    };

    const orderingSortOrderBy = await orderingSortOrderByBuilder[sortBy];

    const productSort = {
      ranking: `, ROUND(AVG(rate), 1) AS rating
    FROM products LEFT JOIN reviews ON products.id = reviews.product_id ${orderingSortWhere} ${orderingSortOrderBy}`,
      regist: `FROM products ${orderingSortWhere} ${orderingSortOrderBy}`,
      low_price: `FROM products ${orderingSortWhere} ${orderingSortOrderBy}`,
      high_price: `FROM products ${orderingSortWhere} ${orderingSortOrderBy}`,
      review: `, COUNT(content) AS review 
    FROM products LEFT JOIN reviews ON products.id = reviews.product_id ${orderingSortWhere} ${orderingSortOrderBy}`,
      sale: `, IFNULL(amount_sales, 0) AS total_sales
    FROM products
    LEFT JOIN (SELECT po.product_option_id, SUM(po.product_quantity) AS amount_sales
    FROM product_orders AS po
    INNER JOIN orders AS o ON o.id = po.order_id
    WHERE o.order_status = 'purchased'
    GROUP BY po.product_option_id) AS po_result ON products.id = po_result.product_option_id
    ${orderingSortWhere}
    GROUP BY products.id
    ${orderingSortOrderBy}`,
      '': '',
    };

    return await productSort[sortBy];
  } catch (err) {
    console.log(err);
  }
};

const pageQueryBuilder = async (page) => {
  try {
    const pagination = `LIMIT 3 OFFSET ${(parseInt(page, 10) - 1) * 3}`;
    return pagination;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sortQueryBuilder,
  pageQueryBuilder,
};
