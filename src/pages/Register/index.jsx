import React, { Component, useState } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [IsRegister, setIsRegister] = useState(false);

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


  //注册请求
  const handleRegister = (event) => {
    //阻止冒泡
    event.preventDefault();

    //做验证
    if (username.length < 5 || password.length < 5) {
      setErr('用户名或者密码不能少于5位');
      return false;
    } else if (/[!@#$%^&*(),.?":{}|<>]/g.test(username) || /[!@#$%^&*(),.?":{}|<>]/g.test(password)) {
      setErr('用户名或者密码不能使用特殊符号');
      return false;
    }

    //  console.log('zhuce');
    axiosInstance.post('/api1/api/register.php', {
      username: username,
      password: password
    }, config).then(response => {
      console.log("注册", response)
      if (response.data.result === 'success') {
        alert('注册成功');
        setIsRegister(true);
      }


    })
      .catch(error => {
        console.log(error)
        setErr(error.response.data.message)
      })
  }



  //注册成功之后重定向
  if (IsRegister) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h1>注册界面</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">用户名:</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={username} onChange={(e) => { setUsername(e.target.value) }} />
            {err ? <div id="emailHelp" className="form-text">{err}</div> : <div id="emailHelp" className="form-text">我们不会泄露任何您的个人信息</div>}



          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">密码:</label>
            <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <button type="submit" className="btn btn-dark btn-block btn-primary">注册</button>
        </form>
      </div>
    </div>
  )

}

export default Register;