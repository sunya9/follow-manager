import { FETCH_USERS, RECEIVE_USERS, FAIL_USERS } from '../constants/users';

export default (state = {
  isFetching: false,
  isInitialized: false,
  users: {},
  error: null
}, action) => {
  switch(action.type) {
  case FETCH_USERS:
    return Object.assign({}, state, {isFetching: true});
  case RECEIVE_USERS:
    return Object.assign({}, state, {isFetching: false, isInitialized: true, users: action.users});
  case FAIL_USERS:
    return Object.assign({}, state, {isFetching: false, error: action.error});
  default:
    return state;
  }
};
