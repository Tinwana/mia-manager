const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
    {
        name: { type: String, required:true,unique:true},
        productId:{type: String, required:true,default:100},
        type: { type: String},
        size:{type: String, required:true},
        wholesalePriceChina:{type:Number, required:true},
        wholesalePrice: { type: Number, required:true},
        priceChina:{type:Number, required:true},
        price:{ type: Number,required:true},
        countInStock:{ type: Number, required:true},
        soldInMonth:{ type: Number , default:0},
        soldAll: { type: Number, default:0},
        description: { type: String}
    },
    {
        timestamps:true
    }
    );

    const Product = mongoose.model("Product",productSchema);
    module.exports = Product;
