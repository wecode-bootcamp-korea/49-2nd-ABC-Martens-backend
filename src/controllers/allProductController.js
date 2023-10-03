const { allProductService } = require('../services');
const { productSortService, categoryCheckService } = allProductService;

const allProduct = async (req, res) => {
  console.log(req.query);
  try {
    const { category_id, sub_category_id, sortBy, page } = req.query; //  에러 핸들링 ----------------------------------------

    const categoryCheckController = await categoryCheckService(
      sub_category_id,
      category_id,
    );

    if (categoryCheckController[0].parent_id != category_id) {
      const error = new Error();
      error.statusCode = 400;
      error.message = `category check result - main and sub category unmatched`;
      throw error;
    } //  정렬 ----------------------------------------

    const productSortServiceResult = await productSortService(
      sub_category_id,
      category_id,
      sortBy,
      page,
    );
    const productSortController = productSortServiceResult;

    res.status(200).json({
      sortData: productSortController,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  allProduct,
};
