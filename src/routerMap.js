import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";

export default [
   {path:'/',name:"App",component:Index,auth:true},
   {path:'/home',name:"Home",component:Home,auth:true},
   {path:'/login',name:"Login",component:Login},
   {path:'/register',name:"Register",component:Register},
   {path:'/404',name:"404",component:ErrorPage},
];

