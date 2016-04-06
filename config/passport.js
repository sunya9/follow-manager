const passport = require('koa-passport');
const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new TwitterStrategy(require('./key'), (token, tokenSecret, profile, done) => {
    profile.token = token;
    profile.tokenSecret = tokenSecret;
    done(null, profile);
  }));
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
