import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

class Hello extends React.Component {
  constructor(props) {
    super(props)
    console.log("TCL: Hello -> constructor -> props", props)
  }

  render() {
    return (
      <div className="login">
        <div className="center">
          <p>Your workplace wellness tracker.</p>
          <div>
            {this.props.isLoggedIn?
              <Link to="/dashboard">
              <button>Continue</button>
              </Link>
            :
            <Link to="/login">
              <button>Continue</button>
            </Link>
            }
          </div>
        </div>
      </div>
    );
  }
}


export default connect(
  state => ({
    isLoggedIn: !!state.user.id,
    user: state.user }),
)(Hello);
