import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateUserPreferences,
  getUserPreferences
} from "../store/reducers/userPreferencesReducer";
import { savePreferences ,setPreferences } from "../dataToMainProcess";

class UpdatePreferences extends Component {
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
      setPreferences(this.props.userPreferences)
      savePreferences()
      this.props.toggleUpdatePage()
    } catch (err) {
      console.log(err)
    }
  };

  render() {
    return (
      <div>
        <h1>Update your preferences</h1>
        <form name="preferences" onSubmit={this.handleSubmit}>
          {this.props.activities.map(activity => {
            return (
              <div key={activity.id}>
                <input
                  onChange={this.handleCheck}
                  name="include"
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
                      placeholder={activity.duration}
                    />
                  </>
                )}
                <h5>time between reminders:</h5>
                <input
                  onChange={this.handleChange}
                  type="number"
                  id={activity.id}
                  name="frequency"
                  placeholder={activity.frequency + " minutes"}
                />
              </div>
            );
          })}

          <button type="submit">Updates Complete</button>
        </form>
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
    updateUserPreferences: (activities, userId) =>
      dispatch(updateUserPreferences(activities, userId)),
    getUserPreferences: userId => dispatch(getUserPreferences(userId))
  };
};

export default connect(mapState, mapDispatch)(UpdatePreferences);
