'use strict';

let webpack = require('webpack');
let path = require('path');
let config = {
  entry: {
    'js/bundle': ['webpack-hot-middleware/client', './src/entry']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      'window.Tether': 'tether'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: ['./src']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(ttf|eot|svg|woff2?)(\?[\s\S]+)?$/,
        loader: 'file'
      }
    ]
  },
  devtool: '#source-map',
  devServer: {
    hot: true,
    proxy: {
      '*': 'http://127.0.0.1:' + (process.env.PORT || 3000)
    },
    host: '127.0.0.1'
  }
};


module.exports = config;
