import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserPreferences } from "../store/reducers/userPreferencesReducer";
//import { savePreferences ,setPreferences } from "../dataToMainProcess"; todo make ipcrenderer to save

class PreferenceField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: 0,
      duration: 0,
      active: false,
    }
    this.cancelChanges = this.cancelChanges.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    this.setState({
      frequency: this.props.userPreferences[this.props.activityIndex].frequency,
      duration: this.props.userPreferences[this.props.activityIndex].duration,
      active: this.props.userPreferences[this.props.activityIndex].active
    })
  }

  cancelChanges() {
    this.props.chooseEditActivity(0)
    this.setState({
      frequency: this.props.userPreferences[this.props.activityIndex].frequency,
      duration: this.props.userPreferences[this.props.activityIndex].duration,
      active: this.props.userPreferences[this.props.activityIndex].active
    })
  }

  saveChanges() {

  }

  render() {
    return (
      <form>
        <input
          onChange={this.handleCheck}
          name="include"
          type="checkbox"
          checked={this.state.active ? true : false}
        />
        <label htmlFor={this.props.userPreferences[this.props.activityIndex].id}>{this.props.userPreferences[this.props.activityIndex].name}</label>
        {this.props.userPreferences[this.props.activityIndex].duration > 0 && (
          <>
            <h5>duration:</h5>
            <input
              onChange={this.handleChange}
              type="number"
              name="duration"
              value={this.state.duration}
            />
          </>
        )}
        <h5>time between reminders:</h5>
        <input
          onChange={this.handleChange}
          type="number"
          name="frequency"
          value={this.state.frequency}
        />
      {
        this.props.currentEditActivity === this.props.activityIndex ?
        <div>
          <button>Save</button>
          <button onClick={this.cancelChanges}>Cancel</button>
        </div> :
        <div>
          <button onClick={() => this.props.chooseEditActivity(this.props.activityIndex)}>Edit</button>
        </div>
      }
      </form>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    user: state.user,
    userPreferences: state.userPreferences,
    activityIndex: ownProps.activityIndex,
    currentActivityInEdit: ownProps.currentActivityInEdit,
    chooseEditActivity: ownProps.chooseEditActivity
  };
};

const mapDispatch = dispatch => {
  return {
    getUserPreferences: userId => dispatch(getUserPreferences(userId)),
  };
};

export default connect(mapState, mapDispatch)(PreferenceField);
