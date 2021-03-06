import React from "react";
import { connect } from "react-redux";
import { updateUserPreferences } from "../store/reducers/userPreferencesReducer";
import history from "../history";

class NewUserPrefs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preferences: [
        {
          activityId: 1, //posture
          active: false,
          frequency: 1800000,
          duration: null
        },
        {
          activityId: 2, //movement
          active: false,
          frequency: 3600000,
          duration: 300000
        },
        {
          activityId: 3, //vision
          active: false,
          frequency: 1200000,
          duration: 20000
        },
        {
          activityId: 4, //hydration
          active: false,
          frequency: 3600000,
          duration: null
        },
        {
          activityId: 5, //mindfulness
          active: false,
          frequency: 14400000,
          duration: 600000
        }
      ]
    };
  }

  handleCheck = evt => {
    let newPreferences = this.state.preferences.map(pref => {
      if (pref.activityId === Number(evt.target.id)) {
        return { ...pref, active: evt.target.checked ? true : false };
      } else {
        return pref;
      }
    });
    this.setState(() => ({
      preferences: newPreferences
    }));
  };

  handleSubmit = async evt => {
    evt.preventDefault();
    try {
      await this.props.updateUserPreferences(
        this.state.preferences,
        this.props.user.id
      );
      history.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="dash-container">
        <div className="main-container">
          <div className="card">
            <div id="preferences">
              <p onClick={() => this.props.history.push("/new-user")}>Back</p>

              <h3>Set your preferences</h3>

              <form name="preferences" onSubmit={this.handleSubmit}>
                {this.props.activities.map(activity => {
                  return (
                    <div key={activity.activityId}>
                      <div className="single-prefs">
                        <div className="pref-line-item">
                          <label className="switch">
                            <input
                              onChange={this.handleCheck}
                              name="active"
                              type="checkbox"
                              id={activity.activityId}
                              value={activity.name}
                            />
                            <span className="slider round"></span>
                          </label>
                          <h3>
                            {activity.name.slice(0, 1).toUpperCase() +
                              activity.name.slice(1)}
                          </h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    activities: state.activities,
    user: state.user,
    userPreferences: state.userPreferences
  };
};

const mapDispatch = dispatch => {
  return {
    updateUserPreferences: (activities, userId) =>
      dispatch(updateUserPreferences(activities, userId))
  };
};

export default connect(mapState, mapDispatch)(NewUserPrefs);
