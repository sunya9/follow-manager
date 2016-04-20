import update from 'react/lib/update';
import { FETCH_USERS, RECEIVE_USERS, FAIL_USERS, TOGGLE_SELECT, SELECT_ALL } from '../constants/users';
export default (state = {
  isFetching: false,
  isInitialized: false,
  users: {
    followers: [],
    friends: [],
    allUserInfo: {}
  },
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
    const newUserInfo = Object.assign({}, state.users.allUserInfo[action.id], {select: !state.users.allUserInfo[action.id].select});
    return Object.assign({}, state, {
      users: Object.assign({}, state.users, {
        allUserInfo: Object.assign({}, state.users.allUserInfo, {
          [action.id]: newUserInfo
        })
      })
    });
  }
  case SELECT_ALL: {
    const select = !action.showUsers.every(id => state.users.allUserInfo[id].select);
    const someUserInfo = action.showUsers.reduce((memo, id) => {
      memo[id] = Object.assign({}, state.users.allUserInfo[id], {
        select
      });
      return memo;
    }, {});
    const res = update(state, {
      users: {
        allUserInfo: {
          $set: Object.assign({}, state.users.allUserInfo, someUserInfo)
        }
      }
    });
    return res;
  }
  default:
    return state;
  }
};
