import { CHANGE_MODE, CHANGE_SORT_KEY, CHANGE_REVERSE } from '../constants/settings';

export function changeShowMode(showMode) {
  return {
    type: CHANGE_MODE,
    showMode
  };
}

export function changeSortKey(sortKey) {
  return {
    type: CHANGE_SORT_KEY,
    sortKey
  };
}

export function changeReverse(reverse) {
  return {
    type: CHANGE_REVERSE,
    reverse
  }
}
