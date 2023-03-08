import React, { Component } from 'react'
import qs from "qs"
import axios from 'axios';
export default class Login extends Component {
 
   //初始化状态
    
    state = {
      username:'',
      isFirst:true,  //是否为第一次打开页面
      isLoading:false, //标识是否处于加载中
      err:"",  //存储请求相关的错误信息
      isLogin:false  //是否登录
    }
    //用几个就要创建几个ref
    userNameRef = React.createRef()
    passWordRef = React.createRef()
    
    //用户登录
    loading = async(event)=>{
      //阻止冒泡事件
      event.preventDefault();
      const {userNameRef:{current:{value:username}}} =this
      const {passWordRef:{current:{value:password}}} =this
    

      if(username.trim() === ""|| password.trim() === ""){
         alert("用户名或密码不能为空");
         return false;
      }
      this.setState({isFirst:false})
      this.setState({username:username})
      
      //  console.log("用户名",username)
      //  console.log("密码",password)
      //发送请求
      try{
           // 发送登录请求，获取 JWT
            const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({ username, password }),
            // url:'http://mysite.io/api/login.php'
            url:'http://localhost:3000/api1/api/login.php'
          };
          const response = await axios(options);
          console.log("返回的数据",response)
          if(response.status === 200){
            //改变登录状态
            this.setState({isLogin:true})
            console.log("返回的data",response.data.jwt)
            const {jwt:token} = response.data
            
            localStorage.setItem('jwtToken', token);
          }
       
  
          
      }catch(error){
        console.log('走这儿了?')
         this.setState({err:error.response.data.message})
      }

    }

    //用户注册
    register = async(event)=>{
        //阻止冒泡事件
      event.preventDefault();
      //解构赋值+重命名
      const {userNameRef:{current:{value:username}}} =this
      const {passWordRef:{current:{value:password}}} =this
      if(username.trim() === ""|| password.trim() === ""){
        alert("用户名或密码不能为空");
        return false;
     }
      this.setState({username:username})
      this.setState({password:password})
      this.setState({isFirst:false})
      //发送请求
            try{
              // 发送注册请求，获取 JWT
               const options = {
               method: 'POST',
               headers: {'content-type': 'application/x-www-form-urlencoded'},
               data: qs.stringify({ username, password }),
               // url:'http://mysite.io/api/register.php'
               url:'http://localhost:3000/api1/api/register.php'
             };
             const response = await axios(options);
             console.log("返回的数据",response) 
             if(response.status === 200){
              //改变登录状态
              this.setState({isLogin:true})
              console.log("返回的data",response.data.jwt)
              const {jwt:token} = response.data
              alert('注册成功');
              localStorage.setItem('jwtToken', token);

            }
         }catch(error){
            console.log("注册的",error);
            this.setState({err:error.response.data.message})
         }
  }


  render() {
    const {isFirst,err,isLogin,username}  = this.state

    
    return (
      <div className="card">
        <div className="card-body">
          {isLogin ? 
          <>
          <h1>欢迎{username}</h1>
          <button>logout</button> 
          </>: 
           isFirst ?  <h1 className="card-title">欢迎使用</h1> :<></>}
           {!isLogin ?
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">用户名:</label>
                <input type="text" ref={this.userNameRef} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                {
                  err? <div id="emailHelp" className="form-text">{err}</div>:<div id="emailHelp" className="form-text">我们不会泄露任何您的个人信息</div>
                }
               
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">密码:</label>
                <input type="password"ref={this.passWordRef} className="form-control" id="exampleInputPassword1"/>
              </div>
              <button type="submit" className="btn btn-dark btn-block btn-primary" onClick={this.loading}>登录</button>  <button type="submit" className="btn btn-dark btn-block btn-primary" onClick={this.register}>注册</button>
            </form>
            :<></>}
        </div>
      </div>
    )
  }
}
