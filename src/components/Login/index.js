import React, {useState} from 'react';
import qs from "qs";
import axios from 'axios';

//用函数组件进行重构
function Login() {
  
    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    const[token,setToken] = useState('');
    const[err,setErr] = useState('');
    //默认是登录
    const [authMode, setAuthMode] = useState("signin")
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':'BearerJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1c2VyIiwiYXVkIjoiU1VOIFBFTkciLCJpYXQiOjE2NzgyNjA3OTYsImV4cCI6MTY3ODI2NDM5Niwic3ViIjoiMSJ9.Tgh8tMf0mLRAHeUVvUo5k_Hnt01diq92AiNvHX49CXI'
      }
    };
    
    //创建一个axios实例
    const axiosInstance = axios.create({
      baseURL:'http://localhost:3000',
      timeout:1000
    });

    //添加一个请求拦截器
    axiosInstance.interceptors.request.use(
      config=>{
         const token = localStorage.getItem('token');
         console.log("拦截器",token);
         if(token){
          config.headers.Authorization = `Bearer ${token}`;
         }
         return config;
      },
      error=>{
        //处理请求错误
        return Promise.reject(error)
      }
    );

    
     //登录请求
    const handleLogin = async(event)=>{
    
      //阻止冒泡
      event.preventDefault();
      console.log("头部信息",config);
         //做验证
     
      // console.log("请求其返回的",config)
      axiosInstance.post('/api1/api/login.php',{
          username:username,
          password:password
      },config).then(response=>{
          // console.log("shili",response)
          setToken(response.data.jwt);
          localStorage.setItem('token',response.data.jwt)
      })
      .catch(error=>{
        //  console.log(error)
         setErr(error.response.data.message)
      })
    }


   //更改changeAuthMode的状态
   const changeAuthMode =()=>{
       setAuthMode(authMode === "signin" ? "signup" : "signin")
   }
    //注册请求
   const handleRegister = (event)=>{
      //阻止冒泡
      event.preventDefault();

      //做验证
      if (username.length < 8 || password.length<8) {
        setErr('用户名或者密码不能少于8位');
        return false;
      } else if (/[!@#$%^&*(),.?":{}|<>]/g.test(username) ||/[!@#$%^&*(),.?":{}|<>]/g.test(password)) {
        setErr('用户名或者密码不能使用特殊符号');
        return false;
      }

      //  console.log('zhuce');
      axiosInstance.post('/api1/api/register.php',{
        username:username,
        password:password
      },config).then(response=>{
          console.log("注册",response)
          setToken(response.data.jwt);
          localStorage.setItem('token',response.data.jwt)
      })
      .catch(error=>{
         console.log(error)
        setErr(error.response.data.message)
      })
   }




    const loggedIn = ()=>{
       const token = localStorage.getItem('token');
       if(!token || token === 'undefined'){
        return false;
       }
       return true;
    }

    const handleLogout =()=>{
          //从本地存储中删除token
          localStorage.removeItem('token');
          setToken('')
    }
    if(authMode === "signin"){
      return (
        <div className="card">
          <div className="card-body">
              {loggedIn() ? (
              <div>
                <p>You are logged in.</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) :
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <div className="text-center">
                    还没有账号吗?{" "}
                    <span className="link-primary" onClick={changeAuthMode}>
                       注册
                    </span>
                  </div>
                  <label htmlFor="exampleInputEmail1" className="form-label">用户名:</label>
                  <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={username}  onChange={(e)=>{setUsername(e.target.value)}}/>
                  {err ?   <div id="emailHelp" className="form-text">{err}</div> : <div id="emailHelp" className="form-text">我们不会泄露任何您的个人信息</div>}
                 
                  
                 
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">密码:</label>
                  <input type="password"className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </div>
                <button type="submit" className="btn btn-dark btn-block btn-primary">登录</button> 
              </form>}
          </div>
        </div>
    )
    }
    return (
      <div className="card">
        <div className="card-body">
            {loggedIn() ? (
            <div>
              <p>You are logged in.</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) :
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <div className="text-center">
                  已经注册了??{" "}
                  <span className="link-primary" onClick={changeAuthMode}>
                     去登录
                  </span>
                </div>
                <label htmlFor="exampleInputEmail1" className="form-label">用户名:</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={username}  onChange={(e)=>{setUsername(e.target.value)}}/>
                {err ?   <div id="emailHelp" className="form-text">{err}</div> : <div id="emailHelp" className="form-text">我们不会泄露任何您的个人信息</div>}
               
                
               
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">密码:</label>
                <input type="password"className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
              </div>
              <button type="submit" className="btn btn-dark btn-block btn-primary">注册</button> 
            </form>}
        </div>
      </div>
  )
  
}

export default Login;