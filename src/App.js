import React from "react";
import logo from "./logo.svg";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import MasterDashboard from "./components/MasterDashboard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Hello from "./components/Hello";
import NewUser from "./components/NewUser";
import NewUserPrefs from "./components/NewUserPrefs";
import Test from "./Test";
import Nav from "./Nav";

function App(props) {
  return (
    <div>
      {props.isLoggedIn && <Nav />}
      <Switch>
        <Route exact path="/" component={Hello} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/new-user" component={NewUser} />
        <Route exact path="/new-user-prefs" component={NewUserPrefs} />
        {props.isLoggedIn && (
          <Route exact path="/dashboard" component={MasterDashboard} />
        )}
        <Route component={Hello} />
      </Switch>
    </div>
  );
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  };
};

export default withRouter(connect(mapState)(App));
