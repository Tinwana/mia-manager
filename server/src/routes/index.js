const productRoute = require('./productRoute.js')
const userRoute = require('./userRoute.js')
const orderRoute = require('./orderRoute.js')
const customerRoute = require('./customerRoute.js')

const routes = (app) => {
    app.use('/api/v1/products', productRoute);
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/orders', orderRoute);
    app.use('/api/v1/customers', customerRoute);
}

module.exports = routes;
