var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// From https://github.com/s-panferov/awesome-typescript-loader
// If you want to use new paths and baseUrl feature of TS 2.0 please include TsConfigPathsPlugin.
// This feature is available only for webpack@2.1.
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, '..', 'src'),
      "node_modules",
    ],
    plugins: [
      new TsConfigPathsPlugin({
        configFileName: path.resolve(__dirname, '..', 'tsconfig.json'),
      })
    ]
  },
  entry:  path.resolve(__dirname, '..', 'src', 'index.tsx'),
  output: {
    publicPath: '/',
    filename: '[name].js',
    sourceMapFilename: '[name].[chunkhash].map',
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'src', 'index.html'),
      inject: 'body'
    }),
  ],
  module: {
    rules: [{
      test: [/\.(ts|tsx)$/],
      loader: "awesome-typescript-loader",
      exclude: /\.stories\.tsx/,
    }, {
      test: /\.css$/,
      include: path.join(__dirname, '..', 'src'),
      use: ['style-loader', {
        loader: 'typings-for-css-modules-loader',
        options: {
          modules: true,
          namedExport: true,
        }
      }]
    }, {
      test: /\.tpl.html/,
      loader: 'html-loader',
    }, {
      test: /\.(svg)(\?.+)?$/,
      loader: 'react-svg-loader'
    }, {
      test: /\.(ico|png|jpg|gif|eot|ttf|woff|woff2)(\?.+)?$/,
      loader: 'url-loader?limit=50000'
    }]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'src'),
    publicPath: '/',
    historyApiFallback: true
  },
}
