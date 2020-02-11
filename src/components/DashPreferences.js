import React, { Component } from "react";
import { connect } from "react-redux";
import { FiCalendar, FiEdit2 } from "react-icons/fi";

class DashPreferences extends Component {
  render() {
    return (
      <div>
        <h1>
          <FiCalendar size={20} /> Daily Overview
        </h1>
        <h2>
          My Preferences{" "}
          <FiEdit2
            onClick={this.props.toggleUpdatePage}
            size={15}
            style={{ cursor: "pointer" }}
          />
        </h2>

        {this.props.userPreferences.map(pref => {
          return (
            pref.active && (
              <div className="dash-prefs">
                <div id={`activity-${pref.activity.id}`} />
                <p>
                  {pref.activity.name.slice(0, 1).toUpperCase() +
                    pref.activity.name.slice(1)}{" "}
                  |
                  {pref.frequency < 60000
                    ? ` Every ${pref.frequency / 1000} sec `
                    : pref.frequency >= 60000
                    ? ` Every ${pref.frequency / 60000} mins `
                    : " No preference set "}
                  {pref.duration < 60000 && pref.duration > 0
                    ? `| ${pref.duration / 1000} sec sessions`
                    : pref.duration >= 60000 && pref.duration > 0
                    ? `| ${pref.duration / 60000} min sessions `
                    : " "}
                </p>
              </div>
            )
          );
        })}
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    userPreferences: state.userPreferences,
    toggleUpdatePage: ownProps.toggleUpdatePage
  };
};

export default connect(mapState)(DashPreferences);
