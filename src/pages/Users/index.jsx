import React, { Component } from 'react'
import { useLocation  } from 'react-router-dom'

 function Users(){

  const location = useLocation();
  const { username } = location.state;
   return (

       <div>
            欢迎{username}
       </div>
   )
 }

 export default Users
