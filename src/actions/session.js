import $ from 'jquery';
import { FETCH_LOGIN_STATUS, RECEIVE_LOGIN_STATUS, REQUEST_LOGOUT, SUCCESS_LOGOUT, FAILED_LOGOUT } from '../constants/session';

export const fetchLogin = () => {
  return {
    type: FETCH_LOGIN_STATUS
  };
};

export const receiveLogin = (data) => {
  const { isLogin, name, icon, screen_name } = data;
  return {
    type: RECEIVE_LOGIN_STATUS,
    isLogin,
    name,
    icon,
    screen_name
  };
};

const getLoginStatus = () => {
  return dispatch => {
    dispatch(fetchLogin());
    return $.getJSON('/isLogin')
      .then(data => {
        dispatch(receiveLogin(data));
      });
  };
};

export function getLoginStatusIfNeeded() {
  return (dispatch, getState) => {
    if(getState().isFetching) {
      return Promise.resolve();
    } else {
      return dispatch(getLoginStatus());
    }
  };
}

function fetchLogout() {
  return {
    type: REQUEST_LOGOUT
  };
}

function receiveLogout() {
  return {
    type: SUCCESS_LOGOUT,
    isLogin: false
  };
}

function failedLogout(error) {
  return {
    type: FAILED_LOGOUT,
    error
  };
}

function logout() {
  return dispatch => {
    dispatch(fetchLogout());
    return $.getJSON('/logout')
      .done(() => {
        dispatch(receiveLogout());
      })
      .fail((xh, error) => {
        dispatch(failedLogout(error));
      });
  };
}

export function requestLogout() {
  return (dispatch, getState) => {
    if(getState().isFetching) {
      return Promise.resolve();
    } else {
      return dispatch(logout());
    }
  };
}
