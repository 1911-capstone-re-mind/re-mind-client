import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Switch>
        {/* <Route exact path="/" component={Dashboard} /> */}
        <Route path="/" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
