const { generateToken, throwError } = require('../utils');
const productService = require("../services/productService");

const detail = async (req, res) => {
    const productRequest = req.body;
    const id  = productRequest.id;
    const productReader = await productService.productReader(id);
    console.log("CONTROLLER: PASSED TO SERVICE SUCCESSFULLY")
    return res.status(200).json("HELLO FROM CONTROLLER");
}

const create = async (req, res) => {
    
    const productRequestForCreation = req.body;
    const { product_name, price, original_price, products_description }  = productRequestForCreation;

        if (!product_name) {
        return res.status(400).json("KEY_ERROR")
        }

        if (!price) {
        return res.status(400).json("KEY_ERROR")
        }

        if (!original_price) {
        return res.status(400).json("KEY_ERROR")
        }

    const detailProductCreator = await productCreator.productCreater({productRequestForCreation});
    console.log("CONTROLLER: PASSED TO SERVICE SUCCESSFULLY")
}



module.exports = {

    detail,
    create

}





// const update = async (req, res) => {
//     const producRequest = req.body;
//     const id  = productRequest;

//     const detailProductReader = await productDetail.productReader(id);
//     console.log("CONTROLLER: PASSED TO SERVICE SUCCESSFULLY")
// }

// const deleter = async (req, res) => {
//     const producRequestForDeletion = req.body;
//     const id  = producRequestForDeletion.id;
//     const product_id = id;

//     const detailProductDeleter = await productDetail.productDeleter(id);
//     console.log("CONTROLLER: PASSED TO SERVICE SUCCESSFULLY")
// }









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