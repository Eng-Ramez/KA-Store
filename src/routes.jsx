import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Forget from "./pages/forget/Forget";
import Confirm from "./pages/confirm/Confirm";
import Details_product from "./pages/details_product/Details_product";

const routes = createBrowserRouter([{
    path:'/',
    element:<MainLayout/>,
    errorElement:<Error/>,
    children:[
        {
            path:'/',
            element:<Home/>
        },
        {
            path:'/shop',
            element:<Shop/> 
        },

        {
            path:'/cart',
            element:<Cart/> 
        }, 

        {
            path:'/login',
            element:<Login/> 
        },

        {
            path:'/register',
            element:<Register/> 
        },
         {
            path:'/forget_password',
            element:<Forget/> 
        },
         {
            path:'/confirmcode',
            element:<Confirm/> 
        },
        {
            path:'/product_details/:id',
            element:<Details_product/>

        },
    
],
}]);
export default routes;