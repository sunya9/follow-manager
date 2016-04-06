import $ from 'jquery';
import { FETCH_LOGIN, RECEIVE_LOGIN, REQUEST_LOGOUT, RECEIVE_LOGOUT } from '../constants/session';

export const fetchLogin = () => {
  return {
    type: FETCH_LOGIN
  };
};

export const receiveLogin = (isLogin) => {
  return {
    type: RECEIVE_LOGIN,
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
    type: RECEIVE_LOGOUT,
    isLogin: !ok
  };
}

function logout() {
  return dispatch => {
    dispatch(fetchLogout());
    return $.getJSON('/logout')
      .done(ok => {
        dispatch(receiveLogout(ok));
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
