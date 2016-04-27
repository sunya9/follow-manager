import $ from 'jquery';
import { FETCH_USERS, RECEIVE_USERS, FAIL_USERS, TOGGLE_SELECT, SELECT_ALL } from '../constants/users';

function fetchUsers() {
  return {
    type: FETCH_USERS
  };
}

function receiveUsers(users) {
  Object.keys(users.allUserInfo).forEach(id => users.allUserInfo[id].select = false);
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
    if(getState().users.isFetching) {
      return Promise.resolve();
    } else if(!getState().users.isInitialized) {
      return dispatch(getUsers());
    }
  };
}

export function toggleSelect(id) {
  return {
    type: TOGGLE_SELECT,
    id
  };
}

export function selectAll(showUsers) {
  return {
    type: SELECT_ALL,
    showUsers
  };
}
