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

const allProduct = async (req, res) => {
  try {
    const { sortMode } = req.body;
    // 1. 카테고리  :  남성+여성+키즈+SALE  →  categories + sub_categories
    //   mysql에 데이터 직접 입력(dbmate 이용)
    // ----- 1. 완료 -----

    // 2. 전체페이지의 상품 정렬  :  랭킹순(별점 내림차순), 신규등록순, 낮은가격순, 높은가격순, 상품평많은순, 판매량순

    //   랭킹순  :  별점순 - 내림차순

    let productSort;

    if (sortMode === '랭킹순') {
      productSort = await dataSource.query(`
      SELECT products.id, products.category_id, products.product_name, products.price, AVG(rate) AS rating 
      FROM products LEFT JOIN reviews ON products.id = reviews.product_id 
      GROUP BY products.id, products.category_id, products.product_name, products.price 
      ORDER BY rating DESC`);
    } else if (sortMode === '신규등록순') {
      productSort = await dataSource.query(`
        SELECT * FROM products ORDER BY created_at DESC
        `);
    } else if (sortMode === '낮은가격순') {
      productSort = await dataSource.query(`
        SELECT * FROM products ORDER BY price`);
    } else if (sortMode === '높은가격순') {
      productSort = await dataSource.query(`
        SELECT * FROM products ORDER BY price DESC
      `);
    } else if (sortMode === '상품평많은순') {
      productSort = await dataSource.query(`
      SELECT products.id, products.category_id, products.product_name, products.price, COUNT(content) AS manyContent 
      FROM products LEFT JOIN reviews ON products.id = reviews.product_id 
      GROUP BY products.id, products.category_id, products.product_name, products.price 
      ORDER BY manyContent DESC`);
    }
    // else if (sortMode === '판매량순') {
    //   productSort = await dataSource.query(`
    //   SELECT * FROM products   ~~~~~   WHERE orders.order_status = purchased   ~~~~~~~~
    //   `);
    // }

    // ----- 진행중 -----

    // 3. 페이지네이션
    //   기본 24개(4개씩 6줄)  /  이후 추가시 12개씩(4개씩 3줄)

    // const pageInfo = req.query;
    // const page = parseInt(pageInfo.page);
    // const pageSize = parseInt(pageInfo.pageSize);

    res.status(200).json({
      sortData: productSort,
    });
  } catch (err) {
    console.log(err);
  }
};

// ------------------------------

app.get('/allitem', allProduct);

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
