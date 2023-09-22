const productDetail = require("../services/productDetail");

const detail = async (req, res) => {
    const producRequest = req.body;
    const id  = productRequest.id;

    const detailProductReader = await productDetail.productReader(id);
    console.log("CONTROLLER: PASSED TO SERVICE SUCCESSFULLY")
}


module.exports = {

    detail

}















// const createProduct = async(req, res) => {
//     const productDetailRequest = req.body;
//     const {} = productDetailRequest;

//     const detailProduct = await productDetail.productReader({});

// }

// const updateProduct = async(req, res) => {
//     const productDetailRequest = req.body;
//     const {} = productDetailRequest;

//     await productService.readProductBrief({});

// }

// const deleteProduct = async(req, res) => {
//     const productDetailRequest = req.body;
//     const {} = productDetailRequest;

//     await productService.readProductBrief({});

// }

// module.exports = {

//     createProduct,
//     readProduct,
//     updateProduct,
//     deleteProduct,

// }