import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./store/reducers/userReducer";

class Nav extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.logout();
  }

  render() {
    return (
      <div className="nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/test">test</Link>
        <a href="#" onClick={this.handleClick}>
          Logout
        </a>
      </div>
    );
  }
}
const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};
export default connect(null, mapDispatch)(Nav);
