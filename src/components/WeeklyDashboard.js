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

    const log = this.props.activityLog;
    const log2 = this.props.activityLog;

    let filterdLog = log
      .filter(
        x =>
          (x.userPreferenceId === 2) +
          (x.userPreferenceId === 3) +
          (x.userPreferenceId === 5)
      )
      .filter(entry => entry.month === month && entry.date >= dateRange);
    console.log(filterdLog);
    var result = [];
    filterdLog.forEach(function(obj) {
      var id = obj.userPreferenceId;
      if (!this[id]) result.push((this[id] = obj));
      else this[id].completed_sessions += obj.completed_sessions;
    }, Object.create(null));
    var result2 = [];
    log2.forEach(function(obj) {
      var id = obj.date;
      if (!this[id]) result2.push((this[id] = obj));
      else this[id].completed_sessions += obj.completed_sessions;
    }, Object.create(null));

    return (
      <div className="weekly-dashboard">
        <div className="dash-card-right">
          <h3>Sessions completed this week</h3>
          <VictoryChart domainPadding={20}>
            <VictoryAxis
              tickValues={[1, 2, 3, 4, 5]}
              tickFormat={["Mo", "Tu", "We", "Th", "Fr"]}
            />
            <VictoryAxis
              dependentAxis
              label="Sessions"
              // tickFormat specifies how ticks should be displayed
              tickFormat={t => `${t}`}
            />
            <VictoryBar
              barRatio={0.8}
              style={{ data: { fill: "blue" } }}
              data={log2}
              x="date"
              // data accessor for y values
              y="completed_sessions"
            />
          </VictoryChart>
        </div>
        <div className="dash-card-right">
          <VictoryPie
            colorScale={["orange", "cyan", "red"]}
            data={result}
            // data accessor for x values
            x="user_preference.activity.name"
            // data accessor for y values
            y={d => (d.completed_sessions * d.user_preference.duration) / 60000}
            width={500}
          />
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
