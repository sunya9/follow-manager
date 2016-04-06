const passport = require('koa-passport');

exports.get = passport.authenticate('twitter');