import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchActivities } from "../store/reducers/activities";

class Hello extends React.Component {
  componentDidMount() {
    this.props.fetchActivities();
  }
  render() {
    return <Link to="/login">Hi! Login.</Link>;
  }
}

const mapDispatch = dispatch => {
  return {
    fetchActivities: () => dispatch(fetchActivities())
  };
};

export default connect(null, mapDispatch)(Hello);
