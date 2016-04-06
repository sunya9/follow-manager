import { FETCH_LOGIN, RECEIVE_LOGIN, REQUEST_LOGOUT, RECEIVE_LOGOUT } from '../constants/session';

export default (state = {
  isFetching: false,
  isLogin: false
}, action) => {
  switch(action.type) {
  case FETCH_LOGIN:
    return Object.assign({}, state, {isFetching: true});
  case RECEIVE_LOGIN:
    return Object.assign({}, state, {isFetching: false, isLogin: action.isLogin});
  case REQUEST_LOGOUT:
    return Object.assign({}, state, {isFetching: true});
  case RECEIVE_LOGOUT:
    return Object.assign({}, state, {isFetching: false, isLogin: action.ok});
  default:
    return state;
  }
};
