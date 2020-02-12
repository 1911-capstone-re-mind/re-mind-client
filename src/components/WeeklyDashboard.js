import React from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryPie,
  VictoryAxis,
  VictoryTheme
} from "victory";
import { connect } from "react-redux";
import { fetchLog } from "../store/reducers/activityLogReducer";

class WeeklyDashboard extends React.Component {
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

  render() {
    const today = new Date();
    const dateRange = today.getDate() - 4;
    const month = today.getMonth() + 1;

    const log2 = this.props.activityLog;

    const log = this.props.activityLog
      .filter(
        x =>
          (x.userPreferenceId === 2) +
          (x.userPreferenceId === 3) +
          (x.userPreferenceId === 5)
      )
      .filter(entry => entry.month === month && entry.date >= dateRange); //&& entry.date >= dateRange
    const sessionsComplete = log.some(entry => entry.completed_sessions > 1);
    console.log("log", log);

    var sessionLog = [];
    log.map(function(obj) {
      var id = obj.date;
      if (!this[id]) sessionLog.push((this[id] = obj));
      else this[id].completed_sessions += obj.completed_sessions;
    }, Object.create(null));
    console.log("sessionLog", sessionLog);

    let totals = [];
    log.map(function(entry) {
      const obj = {
        completed_sessions: entry.completed_sessions,
        name: entry.user_preference.activity.name,
        id: entry.user_preference.activity.id,
        duration: entry.user_preference.duration
      };
      let id = entry.user_preference.activityId;
      if (!this[id]) totals.push((this[id] = obj));
      else this[id].completed_sessions += obj.completed_sessions;
    }, Object.create(null));

    console.log(totals);

    return (
      <div className="weekly-dashboard">
        <div className="dash-card-right">
          <h3>Sessions completed this week</h3>
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
                style={{ data: { fill: "#ba7b64" } }}
                data={sessionLog}
                x={data => `${data.month}/${data.date}`}
                // data accessor for y values
                y={"completed_sessions"}
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
              data={totals}
              // data accessor for x values
              labels={({ datum }) =>
                datum.duration * datum.completed_sessions < 60000
                  ? `${datum.name} - ${datum.completed_sessions *
                      (datum.duration / 1000)} sec`
                  : `${datum.name} - ${Math.floor(
                      (datum.completed_sessions * datum.duration) / 60000
                    )} mins`
              }
              labelRadius={({ innerRadius }) => innerRadius + 70}
              // data accessor for y values
              y={d => (d.completed_sessions * d.duration) / 60000}
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

export default connect(mapState, mapDispatch)(WeeklyDashboard);
