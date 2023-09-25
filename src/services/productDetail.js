const productDetailDao = require("../models/productDetailDao");

const productReader = async(id) => {
    
    // const productRequest = req.body;
    // const id = productRequest.id;
    // const {id} = productRequest;

    const productSelector = await productDetailDao.selector(id);
    const productIntroducer = await productDetailDao.introducer(id);
    const imageSelector = await productDetailDao.imageLoader(id);
    const optionSelector = await productDetailDao.option(id);
    const priceSelector = await productDetailDao.price(id);
    
    console.log("SERVICE: PARSED TO DAO SUCCESSFULLY")
 
    // await productDetailDao.readDetail({
    //     productIntroducer,
    //     imageSelector,
    //     optionSelector,
    //     colorViewer,
    //     priceSelector
    // });
    console.log("SERVICE: RECEIVED THE INFO FROM DAO SUCCESSFULLY")
    
    return res.status(200).json( 
        { "productId": productSelector },
        { "productInfo": productIntroducer },
        { "productOption": optionSelector },
        { "message": "PRODUCT READ"}
    )
}

const productDeleter = async(id) => {

    const productDelete = await productDetailDao.productDeleter(id);
    const optionDelete = await productDetailDao.optionDeleter(id);
    const imageDelete = await productDetailDao.imageDeleter(id);

    return res.status(200).json("PRODUCT_DELETED_SUCCESSFULLY");

}

















// const productDetailDao = require("../models/productDetailDao");

// const productReader = async(id) => {
    
//     const productRequest = req.body;
//     const id = productRequest.id;
//     // const {id} = productRequest;

//     const productSelector = await productDetailDao.selector;
//     const productIntroducer = await productDetailDao.introducer;
//     const imageSelector = await productDetailDao.imageLoader;
//     const optionSelector = await productDetailDao.option;
//     const priceSelector = await productDetailDao.price;
    
//     const productSelector = await req.dataSource.query(`SELECT ( product_id ) FROM products WHERE product_id = ${id}`);
//         console.log("PRODUCT_SELECTED_SUCCESSFULLY")
//     const productIntroducer = await req.dataSource.query( `SELECT ( product_id, product_name, price, original_price ) FROM products WHERE product_id = ${id}`);
//         console.log("PRODUCT_READ_SUCCESSFULLY")
//     const imageSelector = await req.dataSource.query(`SELECT ( detail_image_url, thumbnail_image_url ) FROM product_images WHERE product_id = ${id}`);
//         console.log("IMAGE_READ_SUCCESSFULLY")
//     const optionSelector = await req.dataSource.query(`SELECT ( quanity, size, color_id ) FROM options WHERE product_id = ${id}`);
//         console.log("OPTION_READ_SUCCESSFULLY")
//         const color_id = optionSelector.color_id; //색상만을 불러옵니다.
//             const colorViewer = await req.dataSource.query(`SELECT ( color ) FROM colors WHERE color_id = ${color_id}`);
//             console.log("COLOR_READ_SUCCESSFULLY")
//     const priceSelector = await req.dataSource.query(`SELECT ( price, original_price ) FROM products WHERE product_id = ${id}`);
//         console.log("PRICE_READ_SUCCESSFULLY")

//     await productDetailDao.readDetail({
//         productIntroducer,
//         imageSelector,
//         optionSelector,
//         colorViewer,
//         priceSelector
//     });

//     return res.status(200).json( 
//         { "productId": productSelector },
//         { "productInfo": productIntroducer },
//         { "productOption": optionSelector },
//         { "message": "PRODUCT READ"}
//     )
// }






// const Pusher = async(req, res) => {
//     const pusherInformation = req.body;
//     const {} = newImage;
//     const {} = newProduct;
//     const {} = newProductOption;

//     const productPusher = await req.dataSource.query();
//     const imagePusher = await req.dataSource.query();
//     const optionPusher = await req.dataSource.query();
//     `SELECT ( product_id ) FROM products WHERE product_id = ${id}` // product selector
//     `SELECT ( product_id, product_name, price, original_price ) FROM products WHERE product_id = ${id}` // product introducer
//     `SELECT ( detail_image_url, thumbnail_image_url ) FROM product_images WHERE product_id = ${id}` //image selector
//     `SELECT ( quanity, size, color_id ) FROM options WHERE product_id = ${id}` //option selector
//     `SELECT ( price, original_price ) FROM products WHERE product_id = ${id}` 

// }


// const Updater = async(req, res) => {
//     const updateInformation = req.body;
//     const {} = updateImage;
//     const {} = updateProduct;
//     const {} = updateProductOption;

//     const productUpdater = await req.dataSource.query();
//     const imageUpdater = await req.dataSource.query();
//     const optionUpdater = await req.dataSource.query();
//     `SELECT ( product_id ) FROM products WHERE product_id = ${id}` // product selector
//     `SELECT ( product_id, product_name, price, original_price ) FROM products WHERE product_id = ${id}` // product introducer
//     `SELECT ( detail_image_url, thumbnail_image_url ) FROM product_images WHERE product_id = ${id}` //image selector
//     `SELECT ( quanity, size, color_id ) FROM options WHERE product_id = ${id}` //option selector
//     `SELECT ( price, original_price ) FROM products WHERE product_id = ${id}` 


// }


// const Remover = async(req, res) => {



// }





// // const readerProducts = app.post("/readerProducts", acync(req, res) => {
// //     try {
// //         const productRead = req.body;
// //         const { productId, productName } = productRead;
// //         const productInformation = req.dataSource.query(`SELECT`)
// //         const productImage = req.dataSource.query(`SELECT`)
// //         const productOption = req.dataSource.query(``)
// //         const productColor = req.dataSource.query(``)

// //         return res.status(200).json( { productInformation, productImage, productOption, productColor } )

// //     } catch(error) {
// //         console.log(error)
// //         return res.status(400).json("PRODUCTS UNREAD")
// //     }
// // })