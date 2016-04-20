const _ = require('koa-route');
const requireDir = require('require-dir');
const $ = requireDir('../controllers');
const unauthorized = require('../middlewares/401');

module.exports = app => {
  app.use(_.get('/token', $.token.get));
  app.use(_.get('/callback', $.callback.get));
  app.use(_.get('/logout', $.logout.get));
  app.use(_.get('/isLogin', $.isLogin.get));
  app.use(unauthorized);
  app.use(_.get('/users', $.users.get));
};
