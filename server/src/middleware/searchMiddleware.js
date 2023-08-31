const Product = require('../models/productModel.js')

const searchProduct = (req,res,next)=> {
    const searchValue = req.query.search; 
    if(!!searchValue){
        Product.find({ $text: { $search: req.query.q } })
        .exec()
        .then((products) => {
            return res.json(products);
        })
        .catch((error) => {
            return res.status(500).json({
                status: "catch error",
                message: error.message,
        });
    })
    next();
}}
module.exports = searchProduct;