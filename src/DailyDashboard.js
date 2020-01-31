import React from 'react';
import './App.css';
import { VictoryChart, VictoryBar, VictoryPie } from 'victory'
import { sendSettingsToMain, sendDelayToMain } from './dataToMainProcess'

class DailyDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  handleSendSettings() {
    sendSettingsToMain('settings')
  }

  handleSendDelay() {
    sendDelayToMain('delay')
  }

  render() {
    return (
      <div className="daily-dashboard">
        <div className="daily-dashboard-header">
          Your daily report
        </div>
        <button onClick={this.handleSendSettings}>go</button>
        <button onClick={this.handleSendDelay}>go</button>
        <VictoryChart
          domainPadding={20}
        >
          <VictoryBar
            style={{ data: {fill: "blue"} }}
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 6 }
            ]}
          />
        </VictoryChart>
        <VictoryPie
          colorScale={["orange", "cyan"]}
          data={[
            { x: " 80% completed", y: 80 },
            { x: "20% ignored", y: 20 },
          ]}
          width={300}
        />

      </div>
    )
  }
}

export default DailyDashboard;
