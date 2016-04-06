'use strict';

const koa = require('koa');
const passport = require('./config/passport');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
const logger = require('koa-logger');
const serve = require('koa-static');
const routes = require('./config/routes');
const bodyParser = require('koa-bodyparser');
const session = require('koa-generic-session');

const app = koa();

app.use(logger());
app.use(bodyParser());
app.keys = require('./config/salt');
app.use(session());

passport(app);


app.use(require('koa-webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));

app.use(require('koa-webpack-hot-middleware')(compiler, {
  path: '/__webpack_hmr',
  noInfo: true,
  heartbeat: 10 * 1000
}));

routes(app);

app.use(serve('./public'));

app.listen(3000);

module.exports = app;
