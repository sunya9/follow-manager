module.exports = function *(next) {
  if(!this.req.user) {
    this.status = 401;
    this.body = JSON.stringify({
      status: this.status,
      message: this.message
    });
  } else {
    yield next;
  }
};
