import React from "react";
import { connect } from "react-redux";
import { updateUserPreferences } from "../store/reducers/userPreferencesReducer";
import history from "../history";

class NewUserPrefs extends React.Component {
  constructor() {
    super();
    this.state = {
      preferences: [
        {
          activityId: 1, //posture
          active: false,
          frequency: 1800000
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
          frequency: 3600000
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

  handleChange = evt => {
    let newPreferences = this.state.preferences.map(pref => {
      if (pref.activityId === Number(evt.target.id)) {
        return { ...pref, [evt.target.name]: Number(evt.target.value) * 60000 };
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
                {this.props.activities.map((activity, idx) => {
                  return (
                    <div key={activity.id}>
                      <div className="single-prefs">
                        {/* <label htmlFor={`${activity.id}-enable`}>Enable</label> */}
                        <div className="pref-line-item">
                          <label className="switch">
                            <input
                              onChange={this.handleCheck}
                              name="active"
                              type="checkbox"
                              id={activity.id}
                              value={activity.name}
                            />
                            <span class="slider round"></span>
                          </label>
                          <h3>
                            {activity.name.slice(0, 1).toUpperCase() +
                              activity.name.slice(1)}
                          </h3>
                        </div>
                      </div>

                      <div className="single-prefs">
                        <div className="pref-line-item">
                          <p>Frequency:</p>
                        </div>
                        <div className="pref-line-item">
                          <input
                            className="min-input"
                            onChange={this.handleChange}
                            type="number"
                            id={activity.id}
                            name="frequency"
                            placeholder={activity.frequency / 60000}
                          />
                          <p> minutes</p>
                        </div>
                      </div>

                      <div className="single-prefs">
                        {activity.duration > 0 && (
                          <>
                            <div className="pref-line-item">
                              <p>Duration:</p>
                            </div>
                            <div className="pref-line-item">
                              <input
                                className="min-input"
                                onChange={this.handleChange}
                                type="number"
                                id={activity.id}
                                name="duration"
                                placeholder={activity.duration / 60000}
                              />
                              <p> minutes</p>
                            </div>
                          </>
                        )}
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
