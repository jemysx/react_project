import React from 'react'
import { Switch } from 'react-router-dom';
import routerMap from './routerMap';
import FrontendAuth from "./FrontendAuth";
const  App: React.FC =()=> {
  return (
    <Switch>
      <FrontendAuth routerConfig={routerMap} />
    </Switch>

  )
}
export default App