var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var fs = require('fs');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
  output: {
    publicPath: '',
    filename: '[name].bundle.[chunkhash].js',
    sourceMapFilename: '[name].[chunkhash].map',
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
    // Minify JS
    new UglifyJsPlugin({
      sourceMap: false,
      parallel: true,
    }),
    // Minify CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]
});
