import React from "react";
import { connect } from "react-redux";
import { millisecondsToHrMinSec } from "../utils/timeCalculations";

const DashPreferences = (props) => {
  if (props.userPreferences.length > 0) {
    const prefs = props.userPreferences.map(pref => {
      const [ hours, minutes, seconds ] = millisecondsToHrMinSec(pref.frequency);
      let phrase = "";
      if (hours > 0 ) {
        phrase += ` ${hours} hour`;
      }
      if (minutes > 0) {
        phrase += ` ${minutes} minute`;
      }
      if (seconds > 0) {
        phrase += ` ${seconds} second`;
      }
      return {
        phrase: phrase += " intervals",
        active: pref.active
      }
    })
    return (
      <div>
        Your re:minders
        <p>
          Posture: {prefs[0].phrase} ({prefs[0].active ? "Active" : "Inactive"})
        </p>
        <p>
          Movement: {prefs[1].phrase} ({prefs[1].active ? "Active" : "Inactive"})
        </p>
        <p>
          Vision: {prefs[2].phrase} ({prefs[2].active ? "Active" : "Inactive"})
        </p>
        <p>
          Hydration: {prefs[3].phrase} ({prefs[3].active ? "Active" : "Inactive"})
        </p>
        <p>
          Mindfulness: {prefs[4].phrase} ({prefs[4].active ? "Active" : "Inactive"})
        </p>
        <button onClick={props.toggleUpdatePage}>Update Preferences</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Loading...</p>
        <button onClick={props.toggleUpdatePage}>Update Preferences</button>
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

export default connect(mapState)(DashPreferences);
