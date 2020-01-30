import React from "react";
import { withRouter, Route, HashRouter, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Hello from "./components/Hello";

function App() {
  return (
    <div>
      {/* <Navbar /> */}

      <HashRouter>
        <Route exact path="/" component={Hello} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </HashRouter>
    </div>
  );
}

export default withRouter(App);
