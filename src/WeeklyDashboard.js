import React from 'react';
import './App.css';
import { VictoryChart, VictoryBar, VictoryPie } from 'victory'

class WeeklyDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  render() {
    return (
      <div className="weekly-dashboard">
        <div className="weekly-dashboard-header">
          Your weekly report
        </div>
        <VictoryChart
          domainPadding={20}
        >
          <VictoryBar
            style={{ data: {fill: "blue"} }}
            data={[
              { x: 1, y: 6 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 4 }
            ]}
          />
        </VictoryChart>
        <VictoryPie
          colorScale={["orange", "cyan"]}
          data={[
            { x: "70% completed", y: 70 },
            { x: "30% ignored", y: 30 },
          ]}
          width={200}
        />
      </div>
    )
  }
}

export default WeeklyDashboard;
