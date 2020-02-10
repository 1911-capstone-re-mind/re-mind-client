import React from "react";
import { FiBarChart2 } from "react-icons/fi";

const StatsView = props => {
  const today = new Date();

  return (
    <div className="dash-card-right">
      <h1>
        <FiBarChart2 size={20} />{" "}
        {today.toLocaleDateString(undefined, {
          weekday: "long",
          month: "short",
          day: "numeric"
        })}
      </h1>
      <h2>All time stats</h2>

      {props.activityLog.length ? (
        <div id="stats-view">
          <div className="stat-num">
            {props.activityLog
              .filter(log => log.user_preference.activity.name === "movement")
              .reduce((total, entry) => total + entry.completed_sessions, 0)}
            <p> movement sessions</p>
          </div>
          <div className="stat-num">
            {props.activityLog
              .filter(log => log.user_preference.activity.name === "vision")
              .reduce((total, entry) => total + entry.completed_sessions, 0)}
            <p> vision sessions</p>
          </div>
          <div className="stat-num">
            {props.activityLog
              .filter(
                log => log.user_preference.activity.name === "mindfulness"
              )
              .reduce((total, entry) => total + entry.completed_sessions, 0)}
            <p> mindfulness sessions</p>
          </div>
          <div className="stat-num">
            {Math.floor(
              props.activityLog
                .filter(
                  log =>
                    (log.user_preference.activity.name === "mindfulness") +
                    (log.user_preference.activity.name === "vision") +
                    (log.user_preference.activity.name === "movement")
                )
                .reduce((total, entry) => {
                  return (
                    total +
                    (entry.completed_sessions *
                      entry.user_preference.duration) /
                      60000
                  );
                }, 0)
            )}
            <p> total minutes well spent</p>
          </div>
        </div>
      ) : (
        "No stats to report"
      )}
    </div>
  );
};

export default StatsView;
