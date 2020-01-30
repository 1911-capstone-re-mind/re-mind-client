// imports createReducer from ./reducers/index.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
  user: userReducer
});

const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;
// exports createStore with thunk and dev middleware
