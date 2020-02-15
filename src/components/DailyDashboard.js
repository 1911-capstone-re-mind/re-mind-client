import React from "react";
import { VictoryChart, VictoryBar, VictoryPie, VictoryAxis } from "victory";
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
    const today = new Date();
    const log = this.props.activityLog.filter(d => d.date === today.getDate()); //today.getDate()
    const sessionsComplete = log.some(entry => entry.completed_sessions > 1);
    console.log(log);
    return (
      <div className="daily-dashboard">
        <div className="dash-card-right">
          <h3>Sessions completed today</h3>
          {sessionsComplete ? (
            <VictoryChart domainPadding={20}>
              <VictoryAxis
                style={{
                  axis: { stroke: "#c9c4c4" },
                  axisLabel: { fill: "#c9c4c4", fontFamily: "Avenir" },
                  tickLabels: { fill: "#c9c4c4", fontFamily: "Avenir" },
                  ticks: { stroke: "#c9c4c4" }
                }}
                tickValues={[1, 2, 3, 4, 5]}
                tickFormat={[
                  "Posture",
                  "Movement",
                  "Vision",
                  "Hydration",
                  "Mindfulness"
                ]}
              />
              <VictoryAxis
                style={{
                  axis: { stroke: "#c9c4c4" },
                  axisLabel: { fill: "#c9c4c4", fontFamily: "Avenir" },
                  tickLabels: { fill: "#c9c4c4", fontFamily: "Avenir" },
                  ticks: { stroke: "#c9c4c4" }
                }}
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={t => `${t}`}
              />
              <VictoryBar
                style={{
                  data: {
                    fill: ({ datum }) =>
                      datum.user_preference.activityId === 1
                        ? "#ba7b64"
                        : datum.user_preference.activityId === 2
                        ? "#738a98"
                        : datum.user_preference.activityId === 3
                        ? "#9a8e67"
                        : datum.user_preference.activityId === 4
                        ? "#987383"
                        : datum.user_preference.activityId === 5
                        ? "#636b95"
                        : "grey"
                  }
                }}
                data={log}
                // data accessor for x values
                x="user_preference.activityId"
                // data accessor for y values
                y="completed_sessions"
              />
            </VictoryChart>
          ) : (
            <div>
              <p>No sessions completed yet.</p>
            </div>
          )}
        </div>
        <div className="dash-card-right">
          <h3>Minutes well spent</h3>
          {sessionsComplete ? (
            <VictoryPie
              style={{ labels: { fill: "#c9c4c4", fontFamily: "Avenir" } }}
              colorScale={["#738a98", "#9a8e67", "#636b95"]}
              data={log
                .filter(
                  x =>
                    (x.user_preference.activityId === 2) +
                    (x.user_preference.activityId === 3) +
                    (x.user_preference.activityId === 5)
                )
                .filter(entry => entry.completed_sessions > 0)}
              // data accessor for x values
              labels={({ datum }) =>
                datum.completed_sessions * datum.user_preference.duration <
                60000
                  ? `${
                      datum.user_preference.activity.name
                    } - ${datum.completed_sessions *
                      (datum.user_preference.duration / 1000)} sec`
                  : `${datum.user_preference.activity.name} - ${Math.floor(
                      (datum.completed_sessions *
                        datum.user_preference.duration) /
                        60000
                    )} mins`
              }
              labelRadius={({ innerRadius }) => innerRadius + 45}
              // data accessor for y values
              y={d =>
                (d.completed_sessions * d.user_preference.duration) / 60000
              }
              width={500}
            />
          ) : (
            <div>
              <p>No minutes to report.</p>
            </div>
          )}
        </div>
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
