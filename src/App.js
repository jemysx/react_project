import React, { Component} from 'react'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import Login from './components/Login'
import Users from './components/Users'
export default class App extends Component {

  render() {
    return (
        <div className="container">
        <Login/>
        </div>
    )
  }
}
