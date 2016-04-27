const push = Array.prototype.push;
const PromisifyTwitter = require('../utils/promisify-twitter');
const co = require('co');
const _ = require('lodash');

exports.get = function *() {
  'use strict';

  const client = new PromisifyTwitter(this);
  const res = {
    friends: [
      // 58752234,
      // 94347296,
      // 14674531,
      // 64240449,
      // 86061782,
      // 16069066,
      // 47035434,
      // 4622881,
      // 612263681,
      // 195266842,
      // 121763617
    ],
    followers: [
      // 58752234,
      // 94347296,
      // 14674531,
      // 64240449,
      // 86061782,
      // 16069066,
      // 47035434,
      // 4622881,
      // 246707927,
      // 265977744
    ],
    allUserInfo: [],
    error: null
  };

  const getIds = resource => {
    return new Promise((resolve, reject) => {
      co(function *() {
        let cursor = -1;
        const res = [];
        do {
          try {
            const ids = yield client.get(resource, {
              user_id: this.req.user.id,
              cursor,
              stringify_ids: true
            });
            push.apply(res, ids.ids);
            cursor = ids.next_cursor_str;
          } catch(e) {
            reject(e);
          }
        }while(cursor !== '0');
        resolve(res);
      }.bind(this));
    });
  };

  try {
    const ids = yield {
      friends: getIds('/friends/ids.json'),
      followers: getIds('/followers/ids.json')
    };
    //
    push.apply(res.friends, ids.friends.splice(0, 100));
    push.apply(res.followers, ids.followers.splice(0, 100));

    const allIds = _.union(res.friends, res.followers);
    res.allUserInfo = yield _.chain(allIds)
      .chunk(100)
      .map(chunkedIds => chunkedIds.join(','))
      .map(stringIds => {
        console.log(stringIds);
        return Promise.all([
          client.get('/users/lookup.json', {
            user_id: stringIds
          }),
          client.get('/friendships/lookup.json', {
            user_id: stringIds
          })
        ]);
      })
    .value();
    res.allUserInfo = _.chain(res.allUserInfo)
      .map(unmergedInfo => _.merge(unmergedInfo[0], unmergedInfo[1]))
      .flatten()
      .reduce((memo, user) => {
        console.log(user.id_str);
        memo[user.id_str] = user;
        return memo;
      }, {})
      .value();
    this.body = JSON.stringify(res);
  } catch(e) {
    let e2 = e;
    if(_.isArray(e2)) e2 = e2[0];
    this.body = e2;
  }
};
