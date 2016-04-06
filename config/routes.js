const _ = require('koa-route');
const requireDir = require('require-dir');
const $ = requireDir('../controllers');
module.exports = app => {
  app.use(_.get('/token', $.token.get));
  app.use(_.get('/callback', $.callback.get));
  app.use(_.get('/logout', $.logout.get));
  app.use(_.get('/api', $.api.get));
  app.use(_.post('/api', $.api.post));
  app.use(_.get('/isLogin', $.isLogin.get));
  app.use(_.get('/users', $.users.get));
};
