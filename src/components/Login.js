import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../store/reducers/userReducer";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(evt) {
    try {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      await this.props.auth({ email, password }, formName);
    } catch (err) {
      let errorMessage;
      if (err.message === 'Invalid Credentials') {
        errorMessage = 'Invalid Credentials. Please try again.';
      } else {
        errorMessage = 'Network Error'
      }
      this.setState({
        error: errorMessage
      })
    }
  }

  render() {
    return (
      <div className="login">
        <div className="center">
          <form onSubmit={this.handleSubmit} name="login">
            <div>
              <input placeholder="Email" name="email" type="text" />
            </div>

            <div>
              <input placeholder="Password" name="password" type="password" />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
          {this.state.error ? <div>{this.state.error}</div> : null}
          <div>
            <Link to="/signup">Don't have an account? Sign up.</Link>
          </div>
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
