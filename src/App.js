import React from 'react';
import logo from './logo.svg';
import './App.css';
import {withRouter, Route, Switch} from 'react-router-dom'
import MasterDashboard from './MasterDashboard'
import Test from './Test'
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Hello from "./components/Hello";
import Test from './Test';
import Nav from './Nav';

function App() {
  return (
    <div className='App'>
      <Nav />
      <Switch>
        <Route exact path="/" component={Hello} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="/dashboard" component={MasterDashboard}/>
        <Route component={Hello}/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
