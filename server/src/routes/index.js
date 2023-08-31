const productRoute = require('./productRoute.js')
const userRoute = require('./userRoute.js')
const orderRoute = require('./orderRoute.js')

const routes = (app) => {
    app.use('/api/v1/products', productRoute);
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/orders', orderRoute);
}

module.exports = routes;
