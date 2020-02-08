import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateUserPreferences,
  getUserPreferences
} from "../store/reducers/userPreferencesReducer";
import { savePreferences ,setPreferences } from "../dataToMainProcess";
import PreferenceField from "./PreferenceField"

class UpdatePreferences extends Component {
  constructor() {
    super();
    this.state = {
      currentActivityInEdit: 0
    }

    this.chooseEditActivity = this.chooseEditActivity.bind(this);
  }

  chooseEditActivity(id) {
    this.setState(() => ({
      currentActivityInEdit: id
    }))
  }

  render() {
    return (
      <div>
        <h1>Update your preferences</h1>
        <div>
          <PreferenceField activityIndex={1} currentActivityInEdit={this.state.currentActivityInEdit} chooseEditActivity={this.chooseEditActivity} />
        </div>
        <div>
          <PreferenceField activityIndex={2} currentActivityInEdit={this.state.currentActivityInEdit} chooseEditActivity={this.chooseEditActivity} />
        </div>
        <div>
          <PreferenceField activityIndex={3} currentActivityInEdit={this.state.currentActivityInEdit} chooseEditActivity={this.chooseEditActivity} />
        </div>
        <div>
          <PreferenceField activityIndex={4} currentActivityInEdit={this.state.currentActivityInEdit} chooseEditActivity={this.chooseEditActivity} />
        </div>
        <div>
          <PreferenceField activityIndex={5} currentActivityInEdit={this.state.currentActivityInEdit} chooseEditActivity={this.chooseEditActivity} />
        </div>
        <button onClick={this.props.toggleUpdatePage}>Back</button>
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
