/* eslint strict: 0 */
'use strict';

const path = require('path');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));
const isWeb = (argv && argv.target === 'web');
const output = (isWeb ? 'dist/web' : 'dist/electron');

const options ={
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
    }]
  },
  output: {
    path: path.join(__dirname, output),
    publicPath: path.join(__dirname, 'src'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },
  entry: [
    './src/index',
  ],
  debug: true,
};

module.exports = options;
