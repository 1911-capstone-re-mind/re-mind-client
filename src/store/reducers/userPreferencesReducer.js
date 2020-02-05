import axios from "axios";
import history from "../../history";
import { savePreferences } from "../../dataToMainProcess";
const { ipcRenderer } = window.require("electron");

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
        `http://localhost:8080/api/activities/${userId}`
      );
      dispatch(getPrefs(res.data));
      savePreferences(res.data);
      ipcRenderer.on("preferences-saved", (event, message) => {
        console.log("USER PREFERENCES", message);
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserPreferences = (activities, userId) => {
  return async dispatch => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/activities/prefs/${userId}`,
        activities
      );
      dispatch(updatePrefs(res.data));
      dispatch(getUserPreferences(userId));
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
};

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
