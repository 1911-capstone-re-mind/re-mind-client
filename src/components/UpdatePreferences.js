import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateUserPreferences,
  getUserPreferences
} from "../store/reducers/userPreferencesReducer";
import PreferenceField from "./PreferenceField";
import { MdClose } from "react-icons/md";

class UpdatePreferences extends Component {
  constructor() {
    super();
    this.state = {
      currentActivityInEdit: 0, //sets which activity is being edited. 1 = prosture, etc. 0 means none
      saveInProgress: false
    };

    this.chooseEditActivity = this.chooseEditActivity.bind(this);
    this.initiateSave = this.initiateSave.bind(this);
    this.endSave = this.endSave.bind(this);
  }

  chooseEditActivity(id) {
    this.setState(() => ({
      currentActivityInEdit: id
    }));
  }

  initiateSave() {
    this.setState(() => ({
      saveInProgress: true
    }));
  }

  endSave() {
    this.setState(() => ({
      saveInProgress: false
    }));
  }

  render() {
    return (
      <div className="dash-container">
        <div className="main-container">
          <div className="card">
            <div id="preferences">
              <h1>Your re:minders</h1>
              <div className="close-window">
                <MdClose onClick={this.props.toggleUpdatePage} />
              </div>
              <div>
                <PreferenceField
                  activityIndex={1}
                  currentActivityInEdit={this.state.currentActivityInEdit}
                  chooseEditActivity={this.chooseEditActivity}
                  initiateSave={this.initiateSave}
                  endSave={this.endSave}
                  saveInProgress={this.state.saveInProgress}
                />
              </div>
              <div>
                <PreferenceField
                  activityIndex={2}
                  currentActivityInEdit={this.state.currentActivityInEdit}
                  chooseEditActivity={this.chooseEditActivity}
                  initiateSave={this.initiateSave}
                  endSave={this.endSave}
                  saveInProgress={this.state.saveInProgress}
                />
              </div>
              <div>
                <PreferenceField
                  activityIndex={3}
                  currentActivityInEdit={this.state.currentActivityInEdit}
                  chooseEditActivity={this.chooseEditActivity}
                  initiateSave={this.initiateSave}
                  endSave={this.endSave}
                  saveInProgress={this.state.saveInProgress}
                />
              </div>
              <div>
                <PreferenceField
                  activityIndex={4}
                  currentActivityInEdit={this.state.currentActivityInEdit}
                  chooseEditActivity={this.chooseEditActivity}
                  initiateSave={this.initiateSave}
                  endSave={this.endSave}
                  saveInProgress={this.state.saveInProgress}
                />
              </div>
              <div>
                <PreferenceField
                  activityIndex={5}
                  currentActivityInEdit={this.state.currentActivityInEdit}
                  chooseEditActivity={this.chooseEditActivity}
                  initiateSave={this.initiateSave}
                  endSave={this.endSave}
                  saveInProgress={this.state.saveInProgress}
                />
              </div>
            </div>
          </div>
        </div>
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
