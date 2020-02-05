import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserPreferences } from "../store/reducers/userPreferencesReducer";
import { Link } from "react-router-dom";

class DashPreferences extends Component {
  componentDidMount() {
    try {
      this.props.getUserPreferences(this.props.user.id);
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const pref = this.props.userPreferences.map(pref => pref.frequency);
    return (
      <div>
        User Preferences
        <p>
          Posture:{" "}
          {pref[0] ? `${pref[0]} minute intervals` : "No preference set"}
        </p>
        <p>
          Movement:{" "}
          {pref[1] ? `${pref[1]} minute intervals` : "No preference set"}
        </p>
        <p>
          Eye Strain:{" "}
          {pref[2] ? `${pref[2]} minute intervals` : "No preference set"}
        </p>
        <p>
          Hydration:{" "}
          {pref[3] ? `${pref[3]} minute intervals` : "No preference set"}
        </p>
        <p>
          Mindfulness:{" "}
          {pref[4] ? `${pref[4]} minute intervals` : "No preference set"}
        </p>
        <button onClick={this.props.toggleUpdatePage}>Update Preferences</button>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    activities: state.activities,
    user: state.user,
    userPreferences: state.userPreferences,
    toggleUpdatePage: ownProps.toggleUpdatePage
  };
};

const mapDispatch = dispatch => {
  return {
    getUserPreferences: userId => dispatch(getUserPreferences(userId))
  };
};

export default connect(mapState, mapDispatch)(DashPreferences);
