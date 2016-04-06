exports.get = function *() {
  this.body = JSON.stringify({
    isLogin: !!this.req.user
  });
};
