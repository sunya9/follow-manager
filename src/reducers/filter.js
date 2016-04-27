import { REQUEST_UPDATE_FILTER, UPDATE_FILTER } from '../constants/filter';

export default (state = {
  text: '',
  timer: null
}, action) => {
  switch(action.type) {
  case REQUEST_UPDATE_FILTER:
    return Object.assign({}, state, {
      timer: action.timer
    });
  case UPDATE_FILTER:
    return Object.assign({}, state, {
      text: action.text,
      timer: null
    });
  default:
    return state;
  }
};
