import axios from "axios";

// action types
const GET_LOG = "GET_LOG";

// action creators
const getLog = log => ({ type: GET_LOG, log });

// thunk creators
export const fetchLog = userId => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/activity-log/${userId}`
      );
      dispatch(getLog(res.data));
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
