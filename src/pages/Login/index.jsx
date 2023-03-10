import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

//用函数组件进行重构
function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [err, setErr] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  //创建一个axios实例
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000
  });

  //添加一个请求拦截器
  axiosInstance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      console.log("拦截器", token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      //处理请求错误
      return Promise.reject(error)
    }
  );


  //登录请求
  const handleLogin = async (event) => {

    //阻止冒泡
    event.preventDefault();
    console.log("头部信息", config);
    //做验证

    //做验证
    if (username.length < 5 || password.length < 5) {
      setErr('用户名或者密码不能少于5位');
      return false;
    } else if (/[!@#$%^&*(),.?":{}|<>]/g.test(username) || /[!@#$%^&*(),.?":{}|<>]/g.test(password)) {
      setErr('用户名或者密码不能使用特殊符号');
      return false;
    }


    //第一次登录请求
    axiosInstance.post('/api1/api/login.php', {
      username: username,
      password: password
    }, config).then(response => {
      if (response.data.jwt || response.data.jwt !== undefined) {
        localStorage.setItem('token', response.data.jwt)
        const token_first = response.data.jwt
        //再次发送请求验证token
        axiosInstance.get('/api1/api/jwt.php').then(function (response) {
          console.log("再次请求", response)
          if (response.data.result === 'success') {
            alert('登录成功')
            //设置token
            setToken(token_first);
            setIsLoggedIn(true);
            setUsername(username)
          } else {

          }
        })
      }


    })
      .catch(error => {
        //  console.log(error)
        setErr(error.response.data.message)
      })
  }

  //登录成功之后重定向
  if (isLoggedIn) {
    return <Redirect to={{ pathname: '/users', state: { username } }} />;
  }


  return (
    <div className="card">
      <div className="card-body">
        <h1>登录界面</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">用户名:</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={username} onChange={(e) => { setUsername(e.target.value) }} />
            {err ? <div id="emailHelp" className="form-text">{err}</div> : <div id="emailHelp" className="form-text">我们不会泄露任何您的个人信息</div>}



          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">密码:</label>
            <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <button type="submit" className="btn btn-dark btn-block btn-primary">登录</button>
        </form>
      </div>
    </div>
  )


}

export default Login;