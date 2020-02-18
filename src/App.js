import React from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import MasterDashboard from "./components/MasterDashboard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Hello from "./components/Hello";
import NewUser from "./components/NewUser";
import NewUserPrefs from "./components/NewUserPrefs";
import UpdatePreferences from "./components/UpdatePreferences";
const { ipcRenderer } = require('electron')

class App extends React.Component {

  componentDidMount() {
    ipcRenderer.send('get-cookies')
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Hello} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/new-user" component={NewUser} />
          <Route exact path="/new-user-prefs" component={NewUserPrefs} />
          <Route exact path="/update-preferences" component={UpdatePreferences} />
          {this.props.isLoggedIn && (
            <Route exact path="/dashboard" component={MasterDashboard} />
          )}
          <Route component={Hello} />
        </Switch>
      </div>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  };
};

export default withRouter(connect(mapState)(App));
