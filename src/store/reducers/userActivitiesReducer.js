// action types
import axios from "axios";
import history from "../../history";

const SET_USER_ACTIVITIES = "SET_USER_ACTIVITIES";
const UPDATE_PREFS = "UPDATE_PREFS";

// action creator for userActivities
const updatePrefs = activities => ({ type: UPDATE_PREFS, activities });

// thunks for userActivities
export const updateUserActivities = (activities, userId) => {
  return async dispatch => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/activities/${userId}`,
        activities
      );
      dispatch(updatePrefs(res.data));
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
};

// reducer
const userActivitiesReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_PREFS:
      return action.activities;
    default:
      return state;
  }
};

export default userActivitiesReducer;
