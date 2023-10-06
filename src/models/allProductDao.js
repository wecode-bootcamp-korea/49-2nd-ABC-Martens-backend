const { dataSource } = require('./dataSource.js');

const productSortDao = async (sortQueryBuilder, pageQueryBuilder) => {
  try {
    const result = await dataSource.query(
      `SELECT products.* ${sortQueryBuilder} ${pageQueryBuilder}`,
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

const categoryCheckDao = async (sub_category_id, category_id) => {
  let categoryCheck;
  try {
    if (!sub_category_id || sub_category_id == 'null') {
      categoryCheck = await dataSource.query(
        `SELECT * FROM sub_categories WHERE parent_id = ${category_id}`,
      );
    } else if (sub_category_id) {
      categoryCheck = await dataSource.query(
        `SELECT * FROM sub_categories WHERE id = ${sub_category_id}`,
      );
    }
  } catch (err) {
    console.log(err);
  }
  return categoryCheck;
};

const totalAmountDao = async (category_id) => {
  try {
    const result = await dataSource.query(
      `SELECT COUNT(id) AS total_amount FROM products WHERE category_id = "${category_id}" GROUP BY category_id`,
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  productSortDao,
  categoryCheckDao,
  totalAmountDao,
};
