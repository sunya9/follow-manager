import { CHANGE_MODE } from '../constants/settings';

export function changeShowMode(mode) {
  return {
    type: CHANGE_MODE,
    showMode: mode
  };
}
