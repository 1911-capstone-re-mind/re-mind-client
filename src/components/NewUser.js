import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const NewUser = props => {
  return (
    <div>
      <h1>Welcome to re:mind, your personal workplace wellness tracker.</h1>
      <p>This app will help you focus on:</p>
      {props.activities.map(activity => (
        <div key={activity.id}>
          <h5>{activity.name}</h5>
          <p>{activity.description}</p>
        </div>
      ))}
      <Link to="/new-user-prefs">Continue</Link>
    </div>
  );
};

const mapState = state => {
  return {
    activities: state.activities
  };
};

export default connect(mapState)(NewUser);
