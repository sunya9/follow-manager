import $ from 'jquery';
import { FETCH_USERS, RECEIVE_USERS, FAIL_USERS } from '../constants/users';

function fetchUsers() {
  return {
    type: FETCH_USERS
  };
}

function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

function failReceiveUsers(error) {
  return {
    type: FAIL_USERS,
    error
  };
}

function getUsers() {
  return dispatch => {
    dispatch(fetchUsers());
    return $.getJSON('/users')
      .done(data => dispatch(receiveUsers(data)))
      .fail(error => dispatch(failReceiveUsers(error)));
  };
}

export function getUsersIfNeeded() {
  return (dispatch, getState) => {
    if(getState().isFetching) {
      return Promise.resolve();
    } else {
      return dispatch(getUsers());
    }
  };
}
