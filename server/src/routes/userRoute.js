const express = require("express");
const userRoute = express.Router();
const userController = require('../controllers/userController.js')



userRoute.post('/log-in', userController.logIn)
userRoute.post('/sign-up', userController.signUp)


module.exports = userRoute;
