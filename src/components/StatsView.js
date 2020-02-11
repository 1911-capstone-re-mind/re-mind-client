import React from "react";
import { FiBarChart2 } from "react-icons/fi";

const StatsView = props => {
  const today = new Date();

  return (
    <div className="stats">
      <h1>
        <FiBarChart2 size={20} />{" "}
        {today.toLocaleDateString(undefined, {
          weekday: "long",
          month: "short",
          day: "numeric"
        })}
      </h1>
      <h2>Today's stats</h2>

      {props.activityLog.length ? (
        <div id="stats-view">
          <div className="stat-num">
            {props.activityLog
              .filter(log => log.user_preference.activity.name === "movement")
              .filter(entry => entry.date === today.getDate())
              .reduce((total, entry) => total + entry.completed_sessions, 0)}
            <p> movement sessions</p>
          </div>
          <div className="stat-num">
            {props.activityLog
              .filter(log => log.user_preference.activity.name === "vision")
              .filter(entry => entry.date === today.getDate())
              .reduce((total, entry) => total + entry.completed_sessions, 0)}
            <p> vision sessions</p>
          </div>
          <div className="stat-num">
            {props.activityLog
              .filter(
                log => log.user_preference.activity.name === "mindfulness"
              )
              .filter(entry => entry.date === today.getDate())
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
                .filter(entry => entry.date === today.getDate())
                .reduce((total, entry) => {
                  return (
                    total +
                    (entry.completed_sessions *
                      entry.user_preference.duration) /
                      60000
                  );
                }, 0)
            )}
            <p> total minutes</p>
          </div>
        </div>
      ) : (
        "No stats to report"
      )}
    </div>
  );
};

export default StatsView;
