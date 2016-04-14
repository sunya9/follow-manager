'use strict';
const Twitter = require('twitter');
const key = require('../config/key');

class PromisifyTwitter {
  constructor(context) {
    this.client =  new Twitter({
      consumer_key: key.consumerKey,
      consumer_secret: key.consumerSecret,
      access_token_key: context.req.user.token,
      access_token_secret: context.req.user.tokenSecret
    });
  }

  get(resource, option) {
    return new Promise((resolve, reject) => {
      this.client.get(resource, option, (error, body) => {
        if(error) return reject(error);
        resolve(body);
      });
    });
  }
  post(resource, option) {
    return new Promise((resolve, reject) => {
      this.client.post(resource, option, (error, body) => {
        if(error) return reject(error);
        resolve(body);
      });
    });
  }
}

module.exports = PromisifyTwitter;
