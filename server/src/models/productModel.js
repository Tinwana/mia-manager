const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
    {
        name: { type: String, required:true,unique:true},
        image:{ type: String},
        type: { type: String},
        size:{type: String},
        wholesalePrice: { type: Number, required:true},
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
