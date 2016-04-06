const passport = require('koa-passport');

exports.get = function *() {
  this.req.logout();
  this.body = JSON.stringify({
    ok: !!this.req.user
  });
}
