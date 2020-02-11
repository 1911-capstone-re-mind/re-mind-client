import axios from "axios";
import history from "../../history";
import { clearTimer } from "../../dataToMainProcess";
import store from '../index'
const { ipcRenderer } = window.require('electron')

// action types
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

//default state
const defaultUser = {};

// action creator for users
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

ipcRenderer.on('cookies-received', (event, user) => {
  store.dispatch(getUser(user.data))
  history.push("/dashboard")
})
// thunk for getting user
export const auth = (data, method) => async dispatch => {
  let res;
  try {
    //TO DO : Add Heroku hosted server address
    res = await axios.post(`http://localhost:8080/auth/${method}`, data);
  } catch (authError) {
    if (authError.response.data === 'User already exists') {
      throw new Error('User with that email already exists')
    } else {
      throw new Error('Invalid Credentials')

    }
  }

  try {
    if (method === "signup") {
      dispatch(getUser(res.data.user));
      const info = {user: res.data.user.email, sessionId: res.data.sessionId }
      ipcRenderer.send('successful-login-signup', info)
      history.push("/new-user");
    } else {
      dispatch(getUser(res.data.user));
      const info = {user: res.data.user.email, sessionId: res.data.sessionId }
      ipcRenderer.send('successful-login-signup', info)
      history.push("/dashboard");
    }
  } catch (dispatchOrHistoryErr) {
    throw new Error('Invalid Credentials')
  }
};

export const logout = () => async dispatch => {
  try {
    //TO DO : Add Heroku hosted server address
    await axios.post(`http://localhost:8080/auth/logout`);
    dispatch(removeUser());
    clearTimer();
    ipcRenderer.send('clear-session')
    history.push("/");
  } catch (err) {
    console.error(err);
  }
};

// reducer
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
