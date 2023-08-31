import HomePage from "../pages/homePage"
import ProductPage from "../pages/productPage"
import OrderPage from "../pages/orderPage"
import NotFoundPage from "../pages/NotFoundPage"

export const publicRoutes = [
    {path:'/', element:HomePage, isShowHeader:true},
    {path:'/order', element:OrderPage, isShowHeader:true},
    {path:'/product', element:ProductPage, isShowHeader:true},
    {path:'*', element:NotFoundPage}

]