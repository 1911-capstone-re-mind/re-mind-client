import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSingleUserPreference } from "../store/reducers/userPreferencesReducer";
import { setPreferences, updateTimer } from "../dataToMainProcess";
import { millisecondsToHrMinSec, validateTimes } from "../utils/timeCalculations"

class PreferenceField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequencyHours: 0,
      frequencyMinutes: 0,
      frequencySeconds: 0,
      duration: 0, //in minutes
      active: false,
      loaded: false, //makes sure user's preferences are loaded before they can edit
      error: ''
    }
    this.cancelChanges = this.cancelChanges.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { hours, minutes, seconds } = millisecondsToHrMinSec(this.props.userPreferences[this.props.activityIndex - 1].frequency)
    this.setState({
      frequencyHours: hours,
      frequencyMinutes: minutes,
      frequencySeconds: seconds,
      duration: this.props.userPreferences[this.props.activityIndex - 1].duration / 60000,
      active: this.props.userPreferences[this.props.activityIndex - 1].active,
      loaded: true
    })
  }

  cancelChanges() {
    this.props.chooseEditActivity(0)
    const { hours, minutes, seconds } = millisecondsToHrMinSec(this.props.userPreferences[this.props.activityIndex - 1].frequency)
    this.setState({
      frequencyHours: hours,
      frequencyMinutes: minutes,
      frequencySeconds: seconds,
      duration: this.props.userPreferences[this.props.activityIndex - 1].duration / 60000,
      active: this.props.userPreferences[this.props.activityIndex - 1].active,
      error: ''
    })
  }

  async saveChanges(event) {
    event.preventDefault();
    this.props.initiateSave(); //disable all save buttons

    try {
      if (!validateTimes(this.state.frequencyHours, this.state.frequencyMinutes, this.state.frequencySeconds, this.state.duration, this.props.activityIndex)) {
        throw new Error('Invalid inputs');
      }
      this.props.initiateSave();
      await this.props.updateSingleUserPreference({
        activityId: this.props.activityIndex,
        frequency: this.state.frequencyHours * 3600000 + this.state.frequencyMinutes * 60000 + this.state.frequencySeconds * 1000,
        duration: this.props.activityIndex === 1 || this.props.activityIndex === 4 ? null : this.state.duration * 60000,
        active: this.state.active
      },
        this.props.user.id
      )
      setPreferences(this.props.userPreferences);
      updateTimer(this.props.activityIndex)
      this.props.chooseEditActivity(0); //sets currentActivityInEdit to 0, signaling nothing is selected
      this.props.endSave()
      this.setState(() => ({
        error: ''
      }));
    } catch (err) {
      const { hours, minutes, seconds } = millisecondsToHrMinSec(this.props.userPreferences[this.props.activityIndex - 1].frequency)
      this.setState(() => ({
        frequencyHours: hours,
        frequencyMinutes: minutes,
        frequencySeconds: seconds,
        duration: this.props.userPreferences[this.props.activityIndex - 1].duration / 60000,
        active: this.props.userPreferences[this.props.activityIndex - 1].active,
        error: err.message === 'Invalid inputs' ? 'Invalid inputs' : 'Something went wrong. Please try again'
      }))
      this.props.endSave()
    }
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
    let error = '';
    if (this.state.error) {
      error = (
        <div>
          {this.state.error}
        </div>
      )
    } else {
    }
    return (
      <div>
        <label>Turn on re:minder</label>
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
            <h5>re:minder duration:</h5>
            <input
              onChange={this.handleChange}
              type="number"
              name="duration"
              value={this.state.duration}
              disabled={this.props.currentActivityInEdit !== this.props.activityIndex}
            />
            <label>minutes</label>
          </>
        )}
        <h5>re:minder intervals:</h5>
        <input
          onChange={this.handleChange}
          type="number"
          name="frequencyHours"
          value={this.state.frequencyHours}
          disabled={this.props.currentActivityInEdit !== this.props.activityIndex}
        />
        <label>hours</label>
        <input
          onChange={this.handleChange}
          type="number"
          name="frequencyMinutes"
          value={this.state.frequencyMinutes}
          disabled={this.props.currentActivityInEdit !== this.props.activityIndex}
        />
        <label>minutes</label>
        <input
          onChange={this.handleChange}
          type="number"
          name="frequencySeconds"
          value={this.state.frequencySeconds}
          disabled={this.props.currentActivityInEdit !== this.props.activityIndex}
        />
        <label>seconds</label>
      {
        this.props.currentActivityInEdit !== this.props.activityIndex || !this.state.loaded ?
        <div>
          <button type="button" disabled={this.props.currentActivityInEdit !== this.props.activityIndex && this.props.currentActivityInEdit !== 0} onClick={() => this.props.chooseEditActivity(this.props.activityIndex)}>Edit</button>
        </div> :
        <div>
          <button disabled={this.props.saveInProgress} onClick={this.saveChanges}>Save</button>
          <button type="button" disabled={this.props.saveInProgress} onClick={this.cancelChanges}>Cancel</button>
        </div>
      }
      {error}
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
    chooseEditActivity: ownProps.chooseEditActivity,
    initiateSave: ownProps.initiateSave,
    endSave: ownProps.endSave,
    saveInProgress: ownProps.saveInProgress
  };
};

const mapDispatch = dispatch => {
  return {
    updateSingleUserPreference: (activity, userId) => dispatch(updateSingleUserPreference(activity, userId)),
  };
};

export default connect(mapState, mapDispatch)(PreferenceField);
