import { REQUEST_UPDATE_FILTER, UPDATE_FILTER } from '../constants/filter';

const DEBOUNCE_TIME = 300;

function requestUpdateFilter(timer) {
  return {
    type: REQUEST_UPDATE_FILTER,
    timer
  };
}

export function updateFilterAsync(text) {
  return (dispatch, getState) => {
    if(getState().filter.timer) {
      clearTimeout(getState().filter.timer);
    }
    const timer = setTimeout(() => dispatch(updateFilter(text)), DEBOUNCE_TIME);
    return dispatch(requestUpdateFilter(timer));
  };
}

function updateFilter(text) {
  return {
    type: UPDATE_FILTER,
    text
  };
}
