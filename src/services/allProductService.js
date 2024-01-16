const { allProductDao, listenQueryBuilder } = require('../models');

const { productSortDao, categoryCheckDao, totalAmountDao } = allProductDao;
const { sortQueryBuilder, pageQueryBuilder } = listenQueryBuilder;

const productSortService = async (
  sub_category_id,
  category_id,
  sort_by,
  page,
) => {
  try {
    const sortResult = await sortQueryBuilder(
      sub_category_id,
      category_id,
      sort_by,
    );
    const pageResult = await pageQueryBuilder(page);
    const result = await productSortDao(sortResult, pageResult);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const categoryCheckService = async (sub_category_id, category_id) => {
  try {
    const result = await categoryCheckDao(sub_category_id, category_id);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const totalAmountService = async (category_id) => {
  try {
    const result = await totalAmountDao(category_id);
    return result;
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  productSortService,
  categoryCheckService,
  totalAmountService,
};
