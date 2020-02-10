import React from "react";
import { connect } from "react-redux";
import DailyDashboard from "./DailyDashboard";
import WeeklyDashboard from "./WeeklyDashboard";
import StatsView from "./StatsView";
import DashPreferences from "./DashPreferences";
import UpdatePreferences from "./UpdatePreferences";
import { FaPowerOff } from "react-icons/fa";
import { getUserPreferences } from "../store/reducers/userPreferencesReducer";
import { fetchLog } from "../store/reducers/activityLogReducer";
import { initTimer, setPreferences } from "../dataToMainProcess";
import DashPreferences from "./DashPreferences";
import UpdatePreferences from "./UpdatePreferences";
import { logout } from "../store/reducers/userReducer";

class MasterDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "daily",
      isUpdatingPrefs: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.toggleUpdatePage = this.toggleUpdatePage.bind(this);
  }

  async componentDidMount() {
    await this.props.getUserPreferences(this.props.user.id);
    setPreferences(this.props.userPreferences);
    initTimer();
    await this.props.fetchLog(this.props.user.id);
  }

  handleSwitch(event) {
    this.setState({
      view: event.target.value
    });
  }
  handleClick() {
    this.props.logout();
  }

  toggleUpdatePage() {
    this.setState({
      isUpdatingPrefs: !this.state.isUpdatingPrefs
    });
  }

  render() {
    if (this.state.isUpdatingPrefs) {
      return <UpdatePreferences toggleUpdatePage={this.toggleUpdatePage} />;
    } else {
      let viewSelection;
      if (this.state.view === "weekly") {
        viewSelection = (
          <WeeklyDashboard activityLog={this.props.activityLog} />
        );
      } else {
        viewSelection = <DailyDashboard activityLog={this.props.activityLog} />;
      }
      return (
        <div>
          <div id="dash-nav">
            <FaPowerOff className="icon" onClick={this.handleClick} />
            <button onClick={this.handleSwitch} value="daily">
              Daily View
            </button>
            <button onClick={this.handleSwitch} value="weekly">
              Weekly View
            </button>
          </div>
          <div className="dash-container">
            <div id="dash-sub-container">
              <div className="dash-card-left">
                <DashPreferences toggleUpdatePage={this.toggleUpdatePage} />
              </div>
              <div>
                <StatsView activityLog={this.props.activityLog} />
                {viewSelection}
              </div>
            </div>
          </div>
          <DashPreferences toggleUpdatePage={this.toggleUpdatePage} />
        </div>
      );
    }
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
    fetchLog: userId => dispatch(fetchLog(userId)),
    logout: () => dispatch(logout())
  };
};

export default connect(mapState, mapDispatch)(MasterDashboard);
