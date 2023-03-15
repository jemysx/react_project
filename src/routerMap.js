import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";
import ProductDetail from "./pages/Home/ProductList/ProductDetail";
import ProductList from "./pages/Home/ProductList";

export default [
   {path:'/',name:"App",component:Index,auth:true},
   {path:'/home',name:"Home",component:Home,auth:true},
   {path:'/home/productList/productDetail',name:"ProductDetail",component:ProductDetail,auth:true},
   {path:'/home/productList',name:"ProductList",component:ProductList,auth:true},
   {path:'/login',name:"Login",component:Login},
   {path:'/register',name:"Register",component:Register},
   {path:'/404',name:"404",component:ErrorPage},
];

