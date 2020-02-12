import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSingleUserPreference } from "../store/reducers/userPreferencesReducer";
import { setPreferences, updateTimer } from "../dataToMainProcess";
import {
  millisecondsToHrMin,
  millisecondsToMinSec,
  validateTimes
} from "../utils/timeCalculations";
import { FiEdit2 } from "react-icons/fi";

class PreferenceField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequencyHours: 0,
      frequencyMinutes: 0,
      durationMinutes: 0,
      durationSeconds: 0,
      active: false,
      loaded: false, //makes sure user's preferences are loaded before they can edit
      error: ""
    };
    this.cancelChanges = this.cancelChanges.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const [hours, minutes] = millisecondsToHrMin(
      this.props.userPreferences[this.props.activityIndex - 1].frequency
    );
    let durationMinutes;
    let durationSeconds;
    if (this.props.activityIndex === 1 || this.props.activityIndex === 4) {
      durationMinutes = null;
      durationSeconds = null;
    } else {
      [durationMinutes, durationSeconds] = millisecondsToMinSec(
        this.props.userPreferences[this.props.activityIndex - 1].duration
      );
    }
    this.setState({
      frequencyHours: hours,
      frequencyMinutes: minutes,
      durationMinutes: durationMinutes,
      durationSeconds: durationSeconds,
      active: this.props.userPreferences[this.props.activityIndex - 1].active,
      loaded: true
    });
  }

  cancelChanges() {
    this.props.chooseEditActivity(0);
    const [hours, minutes] = millisecondsToHrMin(
      this.props.userPreferences[this.props.activityIndex - 1].frequency
    );
    let durationMinutes;
    let durationSeconds;
    if (this.props.activityIndex === 1 || this.props.activityIndex === 4) {
      durationMinutes = null;
      durationSeconds = null;
    } else {
      [durationMinutes, durationSeconds] = millisecondsToMinSec(
        this.props.userPreferences[this.props.activityIndex - 1].duration
      );
    }
    this.setState({
      frequencyHours: hours,
      frequencyMinutes: minutes,
      durationMinutes: durationMinutes,
      durationSeconds: durationSeconds,
      active: this.props.userPreferences[this.props.activityIndex - 1].active,
      error: ""
    });
  }

  async saveChanges(event) {
    event.preventDefault();
    this.props.initiateSave(); //disable all save buttons

    try {
      if (
        !validateTimes(
          this.state.frequencyHours,
          this.state.frequencyMinutes,
          this.state.durationMinutes,
          this.state.durationSeconds,
          this.props.activityIndex
        )
      ) {
        throw new Error("Invalid inputs");
      }
      this.props.initiateSave();
      await this.props.updateSingleUserPreference(
        {
          activityId: this.props.activityIndex,
          frequency:
            this.state.frequencyHours * 3600000 +
            this.state.frequencyMinutes * 60000,
          duration:
            this.props.activityIndex === 1 || this.props.activityIndex === 4
              ? null
              : this.state.durationMinutes * 60000 +
                this.state.durationSeconds * 1000,
          active: this.state.active
        },
        this.props.user.id
      );
      setPreferences(this.props.userPreferences);
      updateTimer(this.props.activityIndex);
      this.props.chooseEditActivity(0); //sets currentActivityInEdit to 0, signaling nothing is selected
      this.props.endSave();
      this.setState(() => ({
        error: ""
      }));
    } catch (err) {
      const [hours, minutes] = millisecondsToHrMin(
        this.props.userPreferences[this.props.activityIndex - 1].frequency
      );
      let durationMinutes;
      let durationSeconds;
      if (this.props.activityIndex === 1 || this.props.activityIndex === 4) {
        durationMinutes = null;
        durationSeconds = null;
      } else {
        [durationMinutes, durationSeconds] = millisecondsToMinSec(
          this.props.userPreferences[this.props.activityIndex - 1].duration
        );
      }
      this.setState(() => ({
        frequencyHours: hours,
        frequencyMinutes: minutes,
        durationMinutes: durationMinutes,
        durationSeconds: durationSeconds,
        active: this.props.userPreferences[this.props.activityIndex - 1].active,
        error:
          err.message === "Invalid inputs"
            ? "Invalid inputs"
            : "Something went wrong. Please try again"
      }));
      this.props.endSave();
    }
  }

  handleCheck() {
    this.setState({
      active: !this.state.active
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    let error = "";
    if (this.state.error) {
      error = <div>{this.state.error}</div>;
    } else {
    }
    return (
      <div className="update-card">
        <label className="switch">
          <input
            onChange={this.handleCheck}
            name="include"
            type="checkbox"
            checked={this.state.active ? true : false}
            disabled={
              this.props.currentActivityInEdit !== this.props.activityIndex
            }
          />
          <span class="slider round"></span>
        </label>
        {"  "}
        <label
          htmlFor={
            this.props.userPreferences[this.props.activityIndex - 1].activityId
          }
        >
          {this.props.userPreferences[
            this.props.activityIndex - 1
          ].activity.name
            .slice(0, 1)
            .toUpperCase() +
            this.props.userPreferences[
              this.props.activityIndex - 1
            ].activity.name.slice(1)}
        </label>

        <h5>re:minder intervals:</h5>
        <input
          className="min-input"
          onChange={this.handleChange}
          type="number"
          name="frequencyHours"
          value={this.state.frequencyHours}
          disabled={
            this.props.currentActivityInEdit !== this.props.activityIndex
          }
        />
        <label>hours</label>
        <input
          className="min-input"
          onChange={this.handleChange}
          type="number"
          name="frequencyMinutes"
          value={this.state.frequencyMinutes}
          disabled={
            this.props.currentActivityInEdit !== this.props.activityIndex
          }
        />
        <label>minutes</label>
        {this.props.userPreferences[this.props.activityIndex - 1].duration !==
          null && (
          <>
            <h5>re:minder duration:</h5>
            <input
              className="min-input"
              onChange={this.handleChange}
              type="number"
              name="durationMinutes"
              value={this.state.durationMinutes}
              disabled={
                this.props.currentActivityInEdit !== this.props.activityIndex
              }
            />
            <label>minutes</label>
            <input
              className="min-input"
              onChange={this.handleChange}
              type="number"
              name="durationSeconds"
              value={this.state.durationSeconds}
              disabled={
                this.props.currentActivityInEdit !== this.props.activityIndex
              }
            />
            <label>seconds</label>
          </>
        )}
        {this.props.currentActivityInEdit !== this.props.activityIndex ||
        !this.state.loaded ? (
          <div className="edit-prefs">
            <FiEdit2
              type="button"
              disabled={
                this.props.currentActivityInEdit !== this.props.activityIndex &&
                this.props.currentActivityInEdit !== 0
              }
              onClick={() =>
                this.props.chooseEditActivity(this.props.activityIndex)
              }
            />
          </div>
        ) : (
          <div>
            <button
              type="button"
              disabled={this.props.saveInProgress}
              onClick={this.saveChanges}
            >
              Save
            </button>
            <button
              type="button"
              disabled={this.props.saveInProgress}
              onClick={this.cancelChanges}
            >
             Cancel
            </button>
          </div>
        )}
        {error}
      </div>
    );
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
    updateSingleUserPreference: (activity, userId) =>
      dispatch(updateSingleUserPreference(activity, userId))
  };
};

export default connect(mapState, mapDispatch)(PreferenceField);
