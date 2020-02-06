import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchActivities } from "../store/reducers/activities";

class Hello extends React.Component {
  componentDidMount() {
    this.props.fetchActivities();
  }
  render() {
    return (
      <div className="login">
        <div className="center">
          <p>Your workplace wellness tracker.</p>
          <div>
            <Link to="/login">
              <button>Continue</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    fetchActivities: () => dispatch(fetchActivities())
  };
};

export default connect(null, mapDispatch)(Hello);
