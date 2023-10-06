const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.set('port', process.env.PORT || 8000);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { dataSource } = require('./src/models');

// ------------------

// 전체 작업 목록
//  1. 카테고리 데이터 입력
//  2. 정렬
//  3. pagination
//  4. 필터

// ------------------

// 1. 카테고리 데이터 입력  :  남성+여성+키즈+SALE  →  categories + sub_categories
//  - mysql에 데이터 직접 입력(dbmate 이용)

// ----- 1. 완료 -----

// 2. 전체페이지의 상품 정렬  :  랭킹순, 신규등록순, 낮은가격순, 높은가격순, 상품평많은순, 판매량순
//  - 랭킹순  :  별점 내림차순
//  - 판매량순  :  구매 완료 상태 중 구매 아이템의 구매 수량순

// ----------------

const allProduct = async (req, res) => {
  try {
    const { category_id, sub_category_id, sortBy, page } = req.query;

    console.log(
      `category_id : ${category_id}(${typeof category_id})
      sub_category_id : ${sub_category_id}(${typeof sub_category_id})
      sortBy : ${sortBy}(${typeof sortBy})
      page : ${parseInt(page)}(${typeof parseInt(page)})`,
    );

    //  에러 핸들링 ----------------------------------------

    let categoryCheck;

    if (!sub_category_id) {
      categoryCheck = await dataSource.query(
        `SELECT * FROM sub_categories WHERE parent_id = ${category_id}`,
      );
    } else if (sub_category_id) {
      categoryCheck = await dataSource.query(
        `SELECT * FROM sub_categories WHERE id = ${sub_category_id}`,
      );
    }

    console.log(
      `categoryCheck  :  ${categoryCheck[0].parent_id}(${categoryCheck[0].category_name})`,
    );

    if (categoryCheck[0].parent_id != category_id) {
      const error = new Error();
      error.statusCode = 400;
      error.message = `category check result - main and sub category unmatched`;
      throw error;
    }

    //  정렬 ----------------------------------------

    const orderingSortWhereBuilder = {
      ranking: `WHERE sub_category_id = ${sub_category_id} GROUP BY products.id`, // 랭킹순(별점 내림차순)
      regist: `WHERE sub_category_id = ${sub_category_id}`, // 신규등록순
      low_price: `WHERE sub_category_id = ${sub_category_id}`, // 낮은가격순
      high_price: `WHERE sub_category_id = ${sub_category_id}`, // 높은가격순
      review: `WHERE sub_category_id = ${sub_category_id} GROUP BY products.id`, // 상품평많은순
      sale: `WHERE sub_category_id = ${sub_category_id}`, // 판매량순(구매 완료 상태 중 구매 아이템의 구매 수량순)
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

    console.log(`orderingSortWhere  :  ${orderingSortWhereBuilder[sortBy]}`);

    const orderingSortWhere = orderingSortWhereBuilder[sortBy];

    const orderingSortOrderByBuilder = {
      ranking: 'ORDER BY rating DESC, products.id', // 랭킹순(별점 내림차순)
      regist: 'ORDER BY created_at DESC, products.id', // 신규등록순
      low_price: 'ORDER BY price, products.id', // 낮은가격순
      high_price: 'ORDER BY price DESC, products.id', // 높은가격순
      review: 'ORDER BY review DESC, products.id', // 상품평많은순
      sale: 'ORDER BY total_sales DESC, products.id', // 판매량순(구매 완료 상태 중 구매 아이템의 구매 수량순)
      '': '',
    };

    console.log(
      `orderingSortOrderByBuilder  :  ${orderingSortOrderByBuilder[sortBy]}`,
    );

    const orderingSortOrderBy = orderingSortOrderByBuilder[sortBy];

    const productSortBuilder = {
      ranking: `, ROUND(AVG(rate), 1) AS rating
      FROM products LEFT JOIN reviews ON products.id = reviews.product_id ${orderingSortWhere} ${orderingSortOrderBy}`, // 랭킹순(별점 내림차순)
      regist: `FROM products ${orderingSortWhere} ${orderingSortOrderBy}`, // 신규등록순
      low_price: `FROM products ${orderingSortWhere} ${orderingSortOrderBy}`, // 낮은가격순
      high_price: `FROM products ${orderingSortWhere} ${orderingSortOrderBy}`, // 높은가격순
      review: `, COUNT(content) AS review 
      FROM products LEFT JOIN reviews ON products.id = reviews.product_id ${orderingSortWhere} ${orderingSortOrderBy}`, // 상품평많은순
      sale: `, IFNULL(amount_sales, 0) AS total_sales
      FROM products
      LEFT JOIN (SELECT po.product_option_id, SUM(po.product_quantity) AS amount_sales
      FROM product_orders AS po
      INNER JOIN orders AS o ON o.id = po.order_id
      WHERE o.order_status = 'purchased'
      GROUP BY po.product_option_id) AS po_result ON products.id = po_result.product_option_id
      ${orderingSortWhere}
      GROUP BY products.id
      ${orderingSortOrderBy}`, // 판매량순(구매 완료 상태 중 구매 아이템의 구매 수량순)
      '': '',
    };

    // ------------------------------
    // 3. 페이지네이션
    //  - 기본 24개(4개씩 6줄)  /  이후 추가시 12개씩(4개씩 3줄)
    //  - 우선 테스트용으로 기본 3개  /  이후 추가시 3개씩
    // ----- 3. 완료 -----

    const pagination = `LIMIT 3 OFFSET ${(parseInt(page, 10) - 1) * 3}`;

    const productSort = await dataSource.query(
      `SELECT products.* ${productSortBuilder[sortBy]} ${pagination}`,
    );

    console.log(productSort);
    console.log(
      `MySQL query  :  ${orderingSortWhere} ${orderingSortOrderBy} ${pagination}`,
    );

    res.status(200).json({
      sortData: productSort,
    });
  } catch (err) {
    console.log(err);
  }
};

app.get('/products', allProduct);

app.use((req, _, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, _, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: `${err.status ? err.status : ''} ${err.message}`,
  });
});

app.listen(app.get('port'), () => {
  console.log(`listening.... 🦻http://localhost:${app.get('port')}`);
});
