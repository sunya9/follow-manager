const Twitter = require('twitter');
const key = require('../config/key');
const passport = require('passport');
const _ = require('lodash');

exports.get = function *() {
  const client = new Twitter({
    consumer_key: key.consumerKey,
    consumer_secret: key.consumerSecret,
    access_token_key: this.req.user.token,
    access_token_secret: this.req.user.tokenSecret
  });
  let cursor = -1;
  const res = {
    friends: []
  };
  do {
    client.get('/friends/ids.json', {
      user_id: this.req.user.id,
      cursor
    }, (error, body) => {
      Array.prototype.push.apply(res.friends, body.ids);
      if(body.next_cursor_str) cursor = bodynext_cursor_str;
    });

  }n
  this.body = JSON.stringify([]);
};

function getAllIds(resource, cursor) {

}
