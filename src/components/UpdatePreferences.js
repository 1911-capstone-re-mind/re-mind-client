import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateUserPreferences,
  getUserPreferences
} from "../store/reducers/userPreferencesReducer";
import PreferenceField from "./PreferenceField"

class UpdatePreferences extends Component {
  constructor() {
    super();
    this.state = {
      currentActivityInEdit: 0, //sets which activity is being edited. 1 = prosture, etc
      saveInProgress: false,
    }

    this.chooseEditActivity = this.chooseEditActivity.bind(this);
    this.initiateSave = this.initiateSave.bind(this);
    this.endSave = this.endSave.bind(this);
  }

  chooseEditActivity(id) {
    this.setState(() => ({
      currentActivityInEdit: id
    }))
  }

  initiateSave() {
    this.setState(() => ({
      saveInProgress: true
    }))
  }

  endSave() {
    this.setState(() => ({
      saveInProgress: false
    }))
  }

  render() {
    return (
      <div>
        <h1>Your re:minders</h1>
        <div>
          <PreferenceField activityIndex={1} currentActivityInEdit={this.state.currentActivityInEdit} chooseEditActivity={this.chooseEditActivity} initiateSave={this.initiateSave} endSave={this.endSave} saveInProgress={this.state.saveInProgress}/>
        </div>
        <div>
          <PreferenceField activityIndex={2} currentActivityInEdit={this.state.currentActivityInEdit} chooseEditActivity={this.chooseEditActivity} initiateSave={this.initiateSave} endSave={this.endSave} ssaveInProgress={this.state.saveInProgress}/>
        </div>
        <div>
          <PreferenceField activityIndex={3} currentActivityInEdit={this.state.currentActivityInEdit} chooseEditActivity={this.chooseEditActivity} initiateSave={this.initiateSave} endSave={this.endSave} ssaveInProgress={this.state.saveInProgress}/>
        </div>
        <div>
          <PreferenceField activityIndex={4} currentActivityInEdit={this.state.currentActivityInEdit} chooseEditActivity={this.chooseEditActivity} initiateSave={this.initiateSave} endSave={this.endSave} ssaveInProgress={this.state.saveInProgress}/>
        </div>
        <div>
          <PreferenceField activityIndex={5} currentActivityInEdit={this.state.currentActivityInEdit} chooseEditActivity={this.chooseEditActivity} initiateSave={this.initiateSave} endSave={this.endSave} ssaveInProgress={this.state.saveInProgress}/>
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
