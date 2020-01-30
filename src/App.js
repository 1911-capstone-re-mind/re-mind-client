import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import MasterDashboard from './MasterDashboard';
import Test from './Test';
import Nav from './Nav';

function App() {
  return (
    <div className='App'>
      <Nav />
      <Switch>
        <Route path="/dashboard" component={MasterDashboard}/>
        <Route path="/test" component={Test}/>
        <Route component={Test}/>
      </Switch>
    </div>
  );
}

export default App;
