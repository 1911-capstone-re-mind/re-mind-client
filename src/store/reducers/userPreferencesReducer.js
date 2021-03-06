import axios from "axios";

// action types
const GET_PREFS = "GET_PREFS";
const UPDATE_PREFS = "UPDATE_PREFS";

// action creator for userPreferences
const getPrefs = activities => ({ type: GET_PREFS, activities });
const updatePrefs = activities => ({ type: UPDATE_PREFS, activities });

// thunks for userPreferences
export const getUserPreferences = userId => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `http://remind-dbserver.herokuapp.com/api/activities/${userId}`
      );
      dispatch(getPrefs(res.data));
    } catch (error) {
      throw new Error("error fetching preferences");
    }
  };
};

export const updateUserPreferences = (activities, userId) => {
  return async dispatch => {
    try {
      const res = await axios.put(
        `http://remind-dbserver.herokuapp.com/api/activities/prefs/${userId}`,
        {
          activities,
          userId
        }
      );
      dispatch(updatePrefs(res.data));
    } catch (error) {
      throw new Error("error updating preferences");
    }
  };
};

export const updateSingleUserPreference = (activity, userId) => {
return async dispatch => {
  try {
    const res = await axios.put(
      `http://remind-dbserver.herokuapp.com/api/activities/prefs/${userId}/${activity.activityId}`,
      {
        activity,
        userId
      }
    );
    dispatch(updatePrefs(res.data));
  } catch (err) {
    throw new Error("error updating preferences")
  }
}
}

// reducer
const userPreferencesReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_PREFS:
      return action.activities;
    case GET_PREFS:
      return action.activities;
    default:
      return state;
  }
};

export default userPreferencesReducer;
