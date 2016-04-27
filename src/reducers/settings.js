import { CHANGE_MODE, CHANGE_SORT_KEY, CHANGE_REVERSE } from '../constants/settings';

export default (state = {
  showMode: 'card',
  sort: {
    key: '',
    reverse: false
  }
}, action) => {
  switch(action.type) {
  case CHANGE_MODE:
    return Object.assign({}, state, {showMode: action.showMode});
  case CHANGE_SORT_KEY:
    return Object.assign({}, state, {
      sort: {
        key: action.sortKey,
        reverse: (state.sort.key !== action.sortKey) ? false : !state.sort.reverse
      }
    });
  case CHANGE_REVERSE:
    return Object.assign({}, state, {
      sort: {
        key: state.sort.key,
        reverse: action.reverse
      }
    });
  default:
    return state;
  }
};
