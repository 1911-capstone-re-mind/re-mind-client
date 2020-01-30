import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../store/reducers/userReducer";

class SignUp extends React.Component {
  constructor() {
    super();
    this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    const firstName = evt.target.firstName.value;
    const lastName = evt.target.lastName.value;
    this.props.auth({ email, password, firstName, lastName }, formName);
  }

  render() {
    return (
      <div id="login">
        <form onSubmit={this.handleSubmit} name="signup">
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input name="firstName" type="text" />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input name="lastName" type="text" />
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
          {/* {error && error.response && <div> {error.response.data} </div>} */}
        </form>
        <button id="google" href="/auth/google">
          Sign Up with Google
        </button>
        <Link to="/login">Already a member? Login.</Link>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    auth: (data, formName) => dispatch(auth(data, formName))
  };
};

export default connect(null, mapDispatch)(SignUp);
