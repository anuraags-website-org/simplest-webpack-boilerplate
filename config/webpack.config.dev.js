var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'src', 'index.html'),
      inject: 'body'
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'src'),
    publicPath: '/',
    historyApiFallback: true,
    proxy: {
      '/_a': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/_a': '' },
      },
    },
  },
});
