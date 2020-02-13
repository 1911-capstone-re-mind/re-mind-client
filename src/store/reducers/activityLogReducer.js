import axios from "axios";
import { saveLog } from "../../dataToMainProcess";

const { ipcRenderer } = window.require("electron");

// action types
const GET_LOG = "GET_LOG";

// action creators
const getLog = log => ({ type: GET_LOG, log });

// thunk creators
export const fetchLog = userId => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `http://remind-dbserver.herokuapp.com/api/activity-log/${userId}`
      );
      dispatch(getLog(res.data));
      saveLog(res.data);
      ipcRenderer.on("log-saved", (event, message) => {
        console.log("USER ACTIVITY LOG", message);
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// reducer
const activityLogReducer = (state = [], action) => {
  switch (action.type) {
    case GET_LOG:
      return action.log;
    default:
      return state;
  }
};

export default activityLogReducer;
