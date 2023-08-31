const express = require("express");
const orderRoute = express.Router();
const orderController = require('../controllers/orderController.js')


orderRoute.put('/update/:id',orderController.updateOrder)
orderRoute.post('/create',orderController.createOrder)
orderRoute.get('/get-all',orderController.getAll)




module.exports = orderRoute;
