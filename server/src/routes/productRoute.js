const express = require("express");
const productRoute = express.Router();
const productController = require('../controllers/productController.js')


productRoute.put('/update/:id',productController.updateProduct)
productRoute.post('/create',productController.createProduct)
productRoute.get('/detail/:id',productController.detailProduct)
productRoute.get('/get-all',productController.getAll)




module.exports = productRoute;
