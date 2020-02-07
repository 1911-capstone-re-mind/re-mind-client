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
      currentActivityInEdit: 0
    }

    this.chooseEditActivity = this.chooseEditActivity.bind(this);
  }

  chooseEditActivity(id) {
    this.setState({
      currentActivityInEdit: id
    })
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
