import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserPreferences } from "../store/reducers/userPreferencesReducer";
//import { savePreferences ,setPreferences } from "../dataToMainProcess"; todo make ipcrenderer to save

class PreferenceField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: 0, //in milliseconds
      duration: 0, //in milliseconds
      active: false,
      isSaveDisabled: false,
      loaded: false
    }
    this.cancelChanges = this.cancelChanges.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      frequency: this.props.userPreferences[this.props.activityIndex - 1].frequency,
      duration: this.props.userPreferences[this.props.activityIndex - 1].duration,
      active: this.props.userPreferences[this.props.activityIndex - 1].active,
      loaded: true

    })
  }

  cancelChanges() {
    this.props.chooseEditActivity(0)
    this.setState({
      frequency: this.props.userPreferences[this.props.activityIndex - 1].frequency,
      duration: this.props.userPreferences[this.props.activityIndex - 1].duration,
      active: this.props.userPreferences[this.props.activityIndex - 1].active
    })
  }

  saveChanges(event) {
    event.preventDefault();
    this.setState({
      isSaveDisabled: true
    })
    //thunk to update one activity
    //ipcRenderer to update timers
    this.props.chooseEditActivity(0);
    this.setState({
      isSaveDisabled: false
    })
  }

  handleCheck() {
    this.setState({
      active: !this.state.active
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <input
          onChange={this.handleCheck}
          name="include"
          type="checkbox"
          checked={this.state.active ? true : false}
          disabled={this.props.currentActivityInEdit !== this.props.activityIndex}
        />
        <label htmlFor={this.props.userPreferences[this.props.activityIndex - 1].activityId}>{this.props.userPreferences[this.props.activityIndex - 1].activity.name}</label>
        {this.props.userPreferences[this.props.activityIndex - 1].duration !== null && (
          <>
            <h5>Break Duration:</h5>
            <input
              onChange={this.handleChange}
              type="number"
              name="duration"
              value={this.state.duration}
              disabled={this.props.currentActivityInEdit !== this.props.activityIndex}
            />
          </>
        )}
        <h5>Reminder Intervals:</h5>
        <input
          onChange={this.handleChange}
          type="number"
          name="frequency"
          value={this.state.frequency}
          disabled={this.props.currentActivityInEdit !== this.props.activityIndex}
        />
      {
        this.props.currentActivityInEdit !== this.props.activityIndex || !this.state.loaded ?
        <div>
          <button type="button" disabled={this.props.currentActivityInEdit !== this.props.activityIndex && this.props.currentActivityInEdit !== 0} onClick={() => this.props.chooseEditActivity(this.props.activityIndex)}>Edit</button>
        </div> :
        <div>
          <button disabled={this.state.isSaveDisabled} onClick={this.saveChanges}>Save</button>
          <button type="button" disabled={this.state.isSaveDisabled} onClick={this.cancelChanges}>Cancel</button>
        </div>
      }
      </div>
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
