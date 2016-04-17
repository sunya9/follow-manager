import { FETCH_USERS, RECEIVE_USERS, FAIL_USERS, TOGGLE_SELECT } from '../constants/users';

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
  case TOGGLE_SELECT: {
    console.log(state);
    console.log(action);
    const newUserInfo = Object.assign({}, state.users.allUserInfo[action.id], {select: !state.users.allUserInfo[action.id].select});
    console.log(newUserInfo);
    // return state;
    return Object.assign({}, state, {
      users: Object.assign({}, state.users, {
        allUserInfo: Object.assign({}, state.users.allUserInfo, {
          [action.id]: newUserInfo
        })
      })
    });
  }
  default:
    return state;
  }
};
