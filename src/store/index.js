// imports createReducer from ./reducers/index.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import userReducer from "./reducers/userReducer";
import activitiesReducer from "./reducers/activities";
import userActivitiesReducer from "./reducers/userActivitiesReducer";

const reducer = combineReducers({
  user: userReducer,
  activities: activitiesReducer,
  userActivities: userActivitiesReducer
});

const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;
// exports createStore with thunk and dev middleware
