import React, { Component } from 'react'
import {  Route, Switch } from 'react-router-dom';
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Users from "./pages/Users"

export default class App extends Component {


  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
      </Switch>

    )
  }
}