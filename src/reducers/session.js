import { FETCH_LOGIN_STATUS, RECEIVE_LOGIN_STATUS, FAILED_LOGIN_STATUS, REQUEST_LOGOUT, SUCCESS_LOGOUT, FAILED_LOGOUT } from '../constants/session';

export default (state = {
  isFetching: false,
  isLogin: false,
  name: null,
  icon: null,
  screen_name: null
}, action) => {
  switch(action.type) {
  case FETCH_LOGIN_STATUS:
    return Object.assign({}, state, {isFetching: true});
  case RECEIVE_LOGIN_STATUS:
    return Object.assign({}, state, {isFetching: false, isLogin: action.isLogin, name: action.name, icon: action.icon, screen_name: action.screen_name});
  case FAILED_LOGIN_STATUS:
    return Object.assign({}, state, {isFetching: false});
  case REQUEST_LOGOUT:
    return Object.assign({}, state, {isFetching: true});
  case SUCCESS_LOGOUT:
    return Object.assign({}, state, {isFetching: false, isLogin: action.ok, name: null, icon: null, screen_name: null});
  case FAILED_LOGOUT:
    return Object.assign({}, state, {isFetching: false});
  default:
    return state;
  }
};
