exports.get = function *() {
  const res = {
    isLogin: !!this.req.user
  };
  if(this.req.user) {
    res.name = this.req.user._json.name;
    res.icon = this.req.user._json.profile_image_url_https;
    res.screen_name = this.req.user._json.screen_name;
  }
  this.body = JSON.stringify(res);
};
