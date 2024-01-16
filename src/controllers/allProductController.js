const { dataSource } = require('../models');
const { allProductService } = require('../services');
const { productSortService, categoryCheckService, totalAmountService } =
  allProductService;

const { throwError } = require('../utils');

const allProduct = async (req, res) => {
  try {
    const { category_id, sub_category_id, sort_by, page } = req.query;

    //  에러 핸들링 ----------------------------------------
    const categoryCheckController = await categoryCheckService(
      sub_category_id,
      category_id,
    );

    if (!categoryCheckController) {
      const error = new Error();
      error.statusCode = 400;
      error.message = `not exist sub_category : ${sub_category_id}`;
      throw error;
    } else if (categoryCheckController[0].parent_id != category_id) {
      const error = new Error();
      error.statusCode = 400;
      error.message = `category check result - main and sub category unmatched`;
      throw error;
    }

    //  정렬 ----------------------------------------
    const productSortServiceResult = await productSortService(
      sub_category_id,
      category_id,
      sort_by,
      page,
    );
    const productSortController = productSortServiceResult;

    if (!productSortController) {
      console.log(`value  :  ${productSortController}`);
      throwError(400, 'not exist res value');
    }

    const totalAmount = await totalAmountService(category_id);

    res.status(200).json({
      sortData: productSortController,
      categoryTotal: totalAmount,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  allProduct,
};
