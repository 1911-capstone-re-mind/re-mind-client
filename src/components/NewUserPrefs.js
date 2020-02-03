import React from "react";
import { connect } from "react-redux";
import { updateUserPreferences } from "../store/reducers/userPreferencesReducer";

class NewUserPrefs extends React.Component {
  constructor() {
    super();
    this.updates = [
      { activityId: 0 },
      { activityId: 1 },
      { activityId: 2 },
      { activityId: 3 },
      { activityId: 4 }
    ];
  }

  handleCheck = evt => {
    this.updates.map(updateObj => {
      if (updateObj.activityId === Number(evt.target.id)) {
        evt.target.checked
          ? (updateObj["include"] = true)
          : (updateObj["include"] = false);
      }
    });
  };

  handleChange = evt => {
    this.updates.map(updateObj => {
      if (updateObj.activityId === Number(evt.target.id))
        updateObj[evt.target.name] =
          evt.target.name === "duration"
            ? Number(evt.target.value)
            : evt.target.name === "frequency"
            ? Number(evt.target.value)
            : evt.target.value;
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const activities = this.updates
      .filter(update => {
        return update.include === true;
      })
      .filter(activity => delete activity.include)
      .filter(activity => (activity["userId"] = this.props.user.id));

    this.props.updateUserPreferences(activities, this.props.user.id);
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
                  placeholder={activity.frequency}
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