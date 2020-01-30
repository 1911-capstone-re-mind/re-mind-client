import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../store/reducers/userReducer";

class Login extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    this.props.auth({ email, password }, formName);
  }

  render() {
    return (
      <div id="login">
        <form onSubmit={this.handleSubmit} name="login">
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
            <button type="submit">Login</button>
          </div>
          {/* {error && error.response && <div> {error.response.data} </div>} */}
        </form>
        <button id="google" href="/auth/google">
          Login with Google
        </button>
        <div>
          <Link to="/signup">Don't have an account? Sign up.</Link>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    auth: (data, formName) => dispatch(auth(data, formName))
  };
};

export default connect(null, mapDispatch)(Login);
