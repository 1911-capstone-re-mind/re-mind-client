import React from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryPie,
  VictoryAxis,
  VictoryTheme
} from "victory";
import { sendSettingsToMain, sendDelayToMain } from "../dataToMainProcess";
import { connect } from "react-redux";
import { fetchLog } from "../store/reducers/activityLogReducer";

class DailyDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }
  componentDidMount() {
    try {
      this.props.fetchLog(this.props.user.id);
    } catch (err) {
      console.log(err);
    }
  }

  handleSendSettings() {
    sendSettingsToMain("settings");
  }

  handleSendDelay() {
    sendDelayToMain("delay");
  }

  render() {
    const log = this.props.activityLog;
    // console.log(
    //   "props",
    //   log
    //     .filter(d => d.date === 3)
    //     .filter(
    //       x =>
    //         (x.userPreferenceId === 2) +
    //         (x.userPreferenceId === 3) +
    //         (x.userPreferenceId === 5)
    //     )
    // );
    return (
      <div className="daily-dashboard">
        <div className="daily-dashboard-header">Your daily report</div>
        <button onClick={this.handleSendSettings}>go</button>
        <button onClick={this.handleSendDelay}>go</button>
        <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
          <VictoryAxis
            label="Activity"
            tickValues={[1, 2, 3, 4, 5]}
            tickFormat={[
              "Posture",
              "Movement",
              "Eye Strain",
              "Hydration",
              "Mindfulness"
            ]}
          />
          <VictoryAxis
            dependentAxis
            label="Sessions"
            // tickFormat specifies how ticks should be displayed
            tickFormat={t => `${t}`}
          />
          <VictoryBar
            style={{ data: { fill: "blue" } }}
            data={log.filter(d => d.date === 3)}
            // data accessor for x values
            x="userPreferenceId"
            // data accessor for y values
            y="completed_sessions"
          />
        </VictoryChart>
        <VictoryPie
          colorScale={["orange", "cyan", "red"]}
          data={log
            .filter(d => d.date === 3)
            .filter(
              x =>
                (x.userPreferenceId === 2) +
                (x.userPreferenceId === 3) +
                (x.userPreferenceId === 5)
            )}
          // data accessor for x values
          x="user_preference.activity.name"
          // data accessor for y values
          y={d => (d.completed_sessions * d.user_preference.duration) / 60000}
          width={500}
        />
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    activityLog: state.activityLog
  };
};

const mapDispatch = dispatch => {
  return {
    fetchLog: userId => dispatch(fetchLog(userId))
  };
};
export default connect(mapState, mapDispatch)(DailyDashboard);
