import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import MasterDashboard from './MasterDashboard'
import Test from './Test'

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path="/dashboard" component={MasterDashboard}/>
        <Route component={Test}/>
      </Switch>
    </div>
  );
}

export default App;
