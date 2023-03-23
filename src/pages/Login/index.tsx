import React, { useState } from 'react';
import {RouteComponentProps, withRouter } from 'react-router-dom';
import api from "../api"



interface Props extends RouteComponentProps{}



//用函数组件进行重构
const Login:React.FC<Props> =  (props)  =>{
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  console.log("登录的props",props)
 

  //登录请求
  const handleLogin = async (event:React.FormEvent<HTMLFormElement>) => {

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


    //第一次登录请求
    api.post('http://localhost:3000/api1/api/login.php', {
      username: username,
      password: password
    }, config).then(response => {
      if (response.data.jwt || response.data.jwt !== undefined) {
        localStorage.setItem('token', response.data.jwt)
        // const token_first = response.data.jwt
        //再次发送请求验证token
        api.get('/api1/api/jwt.php').then(function (response) {
          console.log("1", response)
          if (response.data.result === 'success') {
            alert('登录成功')
          //登录成功后,设置登录状态为1
            // setIsLoggedIn(true);
            setUsername(username)
            props.history.push("/home");

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
  // if (isLoggedIn) {
  //   return <Redirect to={{ pathname: '/users', state: { username } }} />;
  // }
const handleRegister = ()=>{
  props.history.push("/register");
}

  return (
    <div className="wrapper">
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
          <button type="submit" className="btn btn-dark btn-block btn-primary" onClick = {handleRegister}>还没有账号,去注册</button>

        </form>
      </div>
    </div>
  )


}

export default withRouter(Login);