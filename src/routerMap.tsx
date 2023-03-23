import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";
import ProductDetail from "./pages/Home/ProductList/ProductDetail";
import ProductList from "./pages/Home/ProductList";
import React from "react";


//定义类型描述对象结构
interface RouterConfig{
   path:string
   name:string
   component:React.ComponentType
   auth?:boolean
}

const routerMap:RouterConfig[] = [
   {path:'/',name:"App",component:Index,auth:true},
   {path:'/home',name:"Home",component:Home},
   {path:'/home/productList/productDetail',name:"ProductDetail",component:ProductDetail},
   {path:'/home/productList',name:"ProductList",component:ProductList},
   {path:'/login',name:"Login",component:Login},
   {path:'/register',name:"Register",component:Register},
   {path:'/404',name:"404",component:ErrorPage},
]


export default routerMap;
