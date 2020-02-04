import React from "react";
import { connect } from "react-redux";
import DailyDashboard from "./DailyDashboard";
import WeeklyDashboard from "./WeeklyDashboard";
import { getUserPreferences } from "../store/reducers/userPreferencesReducer";
import { fetchLog } from "../store/reducers/activityLogReducer";
import { initTimer } from "../dataToMainProcess";
import DashPreferences from "./DashPreferences";
import Chatbot from "./Chatbot";

class MasterDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "daily"
    };

    this.handleSwitch = this.handleSwitch.bind(this);
  }

  componentDidMount() {
    this.props.getUserPreferences(this.props.user.id);
    initTimer();
    this.props.fetchLog(this.props.user.id);
  }

  handleSwitch(event) {
    this.setState({
      view: event.target.value
    });
  }

  render() {
    let viewSelection;
    if (this.state.view === "weekly") {
      viewSelection = <WeeklyDashboard activityLog={this.props.activityLog} />;
    } else {
      viewSelection = <DailyDashboard activityLog={this.props.activityLog} />;
    }
    return (
      <div className="dashboard">
        <div className="dashboard-navigation">
          <button onClick={this.handleSwitch} value="daily">
            Daily View
          </button>
          <button onClick={this.handleSwitch} value="weekly">
            Weekly View
          </button>
        </div>
        <div className="dashboard-view" style={{ margin: "100px" }}>
          {viewSelection}
        </div>
        <DashPreferences />
        <Chatbot />
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    userPreferences: state.userPreferences,
    activityLog: state.activityLog
  };
};

const mapDispatch = dispatch => {
  return {
    getUserPreferences: userId => dispatch(getUserPreferences(userId)),
    fetchLog: userId => dispatch(fetchLog(userId))
  };
};

export default connect(mapState, mapDispatch)(MasterDashboard);
