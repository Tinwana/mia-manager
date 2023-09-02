const express = require("express");
const orderRoute = express.Router();
const orderServiceMiddleware = require('../middleware/orderServiceMiddleware')
const orderController = require('../controllers/orderController.js')


orderRoute.put('/update/:id',orderController.updateOrder)
orderRoute.post('/create',orderController.createOrder)
orderRoute.get('/detail/:orderId',orderController.getDetail)
orderRoute.get('/get-all',orderServiceMiddleware,orderController.getAll)




module.exports = orderRoute;
