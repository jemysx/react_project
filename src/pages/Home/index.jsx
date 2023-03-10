import React, { Component} from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  render() {
    return (
      <div>
          <h1>首页</h1>
          <Link to="/login">Log In</Link>
          <br />
          <Link to="/register">注册</Link>
      </div>

    )
  }
}
