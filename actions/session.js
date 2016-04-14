import $ from 'jquery';
import { FETCH_LOGIN_STATUS, RECEIVE_LOGIN_STATUS, REQUEST_LOGOUT, SUCCESS_LOGOUT, FAILED_LOGOUT } from '../constants/session';

export const fetchLogin = () => {
  return {
    type: FETCH_LOGIN_STATUS
  };
};

export const receiveLogin = (isLogin) => {
  return {
    type: RECEIVE_LOGIN_STATUS,
    isLogin: isLogin
  };
};

const getLoginStatus = () => {
  return dispatch => {
    dispatch(fetchLogin());
    return $.getJSON('/isLogin')
      .then(data => {
        dispatch(receiveLogin(data.isLogin));
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

function receiveLogout(ok) {
  return {
    type: SUCCESS_LOGOUT,
    isLogin: !ok
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
      .done(ok => {
        dispatch(receiveLogout(ok));
      })
      fail((xh, error) => {
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
