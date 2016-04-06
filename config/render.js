const render = require('koa-ejs');

module.exports = app => {
  return render(app, {
    root: path.join(__dirname, 'views'),
    viewExt: 'html'
  });
};
