import React from "react";
import DailyDashboard from "./DailyDashboard";
import WeeklyDashboard from "./WeeklyDashboard";
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

  handleSwitch(event) {
    this.setState({
      view: event.target.value
    });
  }

  render() {
    let viewSelection;
    if (this.state.view === "weekly") {
      viewSelection = <WeeklyDashboard />;
    } else {
      viewSelection = <DailyDashboard />;
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

export default MasterDashboard;
