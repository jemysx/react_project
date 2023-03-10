import React, { Component } from 'react'
import {Switch,withRouter } from 'react-router-dom';
import routerMap from './routerMap';
import FrontendAuth from "./FrontendAuth";
function App(props) {
 

  return (
    <Switch>
      <FrontendAuth routerConfig={routerMap} />
    </Switch>

  )

}
export default withRouter(App)