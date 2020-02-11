import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const NewUser = props => {
  return (
    <div className="dash-container">
      <div className="main-container">
        <div className="card">
          <h3>Welcome to your personal workplace wellness tracker.</h3>

          <div id="activities-container">
            {props.activities.map(activity => (
              <div className="activity-card" key={activity.activityId}>
                <h2>
                  {activity.name.slice(0,1).toUpperCase() + activity.name.slice(1)}
                </h2>
                <p>{activity.description}</p>
              </div>
            ))}
          </div>
          <Link to="/new-user-prefs">
            <button>Continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    activities: state.activities
  };
};

export default connect(mapState)(NewUser);
