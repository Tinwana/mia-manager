const express = require("express");
const customerRoute = express.Router();
const customerServiceMiddleware = require('../middleware/customerServiceMiddleware')
const customerController = require('../controllers/customerController.js')


customerRoute.get('/detail/:customerId',customerController.getDetail)
customerRoute.put('/update/:id',customerController.updateCustomer)
customerRoute.get('/get-all',customerServiceMiddleware,customerController.getAll)




module.exports = customerRoute;
