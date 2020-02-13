import axios from "axios";
import activities from "../../utils/activities"

const GET_ACTIVITIES = "GET_ACTIVITIES";

const setActivities = activities => {
  return {
    type: GET_ACTIVITIES,
    activities
  };
};

export const fetchActivities = () => {
  return async dispatch => {
    try {
      //TO DO: add Heroku deployed DB address
      const res = await axios.get("http://remind-dbserver.herokuapp.com/api/activities");
      dispatch(setActivities(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

const activitiesReducer = (state = activities, action) => {
  switch (action.type) {
    case GET_ACTIVITIES:
      return action.activities;
    default:
      return state;
  }
};

export default activitiesReducer;
