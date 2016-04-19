import { CHANGE_MODE } from '../constants/settings';

export default (state = {
  showMode: 'card'
}, action) => {
  switch(action.type) {
  case CHANGE_MODE:
    return Object.assign({}, state, {showMode: action.showMode});
  default:
    return state;
  }
};
