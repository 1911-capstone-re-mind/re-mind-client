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
          activityId: 1,
          active: false,
        },
        {
          activityId: 2,
          active: false
        },
        {
          activityId: 3,
          active: false
        },
        {
          activityId: 4,
          active: false
        },
        {
          activityId: 5,
          active: false
        }
      ]
    };
  }

  handleCheck = evt => {
    let newPreferences = this.state.preferences.map(pref => {
      if (pref.activityId === Number(evt.target.id)) {
        return (
          {...pref, active: evt.target.checked ? true :  false}
        )
      } else {
        return pref;
      }
    });
    this.setState(() => ({
      preferences: newPreferences
    }))
  };

  handleChange = evt => {
    let newPreferences = this.state.preferences.map(pref => {
      if (pref.activityId === Number(evt.target.id)) {
        return (
          {...pref, [evt.target.name]: Number(evt.target.value) * 60000}
        ) ;
      } else {
        return pref;
      }
    });
    this.setState(() => ({
      preferences: newPreferences
    }))
  };

  handleSubmit = async evt => {
    evt.preventDefault();
    try {
      await this.props.updateUserPreferences(this.state.preferences, this.props.user.id);
      history.push("/dashboard")
    } catch (err) {
      console.log(err)
    }
  };

  render() {
    return (
      <div>
        <p onClick={() => this.props.history.push("/new-user")}>Back</p>
        <h1>Set your preferences</h1>
        <form name="preferences" onSubmit={this.handleSubmit}>
          {this.props.activities.map(activity => {
            return (
              <div key={activity.id}>
                <input
                  onChange={this.handleCheck}
                  name="active"
                  type="checkbox"
                  id={activity.id}
                  value={activity.name}
                />
                <label htmlFor={activity.id}>{activity.name}</label>
                {activity.duration > 0 && (
                  <>
                    <h5>duration:</h5>
                    <input
                      onChange={this.handleChange}
                      type="number"
                      id={activity.id}
                      name="duration"
                      placeholder={activity.duration / 60000}
                    />
                  </>
                )}
                <h5>time between reminders:</h5>
                <input
                  onChange={this.handleChange}
                  type="number"
                  id={activity.id}
                  name="frequency"
                  placeholder={activity.frequency / 60000}
                />
              </div>
            );
          })}

          <button type="submit">Submit</button>
        </form>
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
