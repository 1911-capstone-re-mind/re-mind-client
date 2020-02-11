import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../store/reducers/userReducer";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

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
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      await this.props.auth({ email, password, firstName, lastName }, formName);
    } catch (err) {
      let errorMessage;
      if (err.message === 'Invalid Credentials') {
        errorMessage = 'Invalid Credentails. Please check your information.';
      } else {
        errorMessage = 'Network Error';
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
          <form onSubmit={this.handleSubmit} name="signup">
            <div>
              <input placeholder="Email" name="email" type="text" />
            </div>
            <div>
              <input placeholder="Password" name="password" type="password" />
            </div>
            <div>
              <input placeholder="First Name" name="firstName" type="text" />
            </div>
            <div>
              <input placeholder="Last Name" name="lastName" type="text" />
            </div>
            <div>
              <button type="submit">Sign Up</button>
            </div>
          </form>
          {this.state.error ? <div>{this.state.error}</div> : null}
          <Link to="/login">Already a member? Login.</Link>
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

export default connect(null, mapDispatch)(SignUp);
