import HomePage from "../pages/homePage"
import ProductPage from "../pages/productPage"
import OrderPage from "../pages/orderPage"
import CustomerPage from "../pages/customerPage"
import UpdateProduct from "../pages/updateProduct"
import UpdateOrder from "../pages/updateOrder"
import CreateProductPage from "../pages/createProduct"
import CreateOrderPage from "../pages/createOrder"
import NotFoundPage from "../pages/NotFoundPage"
import UpdateCustomerPage from "../pages/UpdateCustomerPage/UpdateCustomerPage"

export const publicRoutes = [
    {path:'/customer/update/:customerId', element:UpdateCustomerPage, isShowHeader:true},
    {path:'/customer', element:CustomerPage, isShowHeader:true},
    {path:'/order/update/:orderId', element:UpdateOrder, isShowHeader:true},
    {path:'/order/create', element:CreateOrderPage, isShowHeader:true},
    {path:'/order', element:OrderPage, isShowHeader:true},
    {path:'/product/update/:productId', element:UpdateProduct, isShowHeader:true},
    {path:'/product/create', element:CreateProductPage, isShowHeader:true},
    {path:'/product', element:ProductPage, isShowHeader:true},
    {path:'/', element:HomePage, isShowHeader:true},
    {path:'*', element:NotFoundPage}

]