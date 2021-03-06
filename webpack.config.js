/**
 * Webpack configuration file.
 *
 * Created by kim on 2016-05-10.
 */

'use strict';
const webpack = require('webpack');
const path = require('path');

let BUILD_DIR = path.resolve(__dirname, './dist/assets');

var config = {
  entry: "./src/client/index.js",
  output: {
    path: BUILD_DIR,
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module : {
    loaders : [
      {
        test : /\.(js|jsx)$/,
        exclude: /node_modules/,
        //include:/__tests__/,
        loader: 'babel',
      }
    ]
  }
};

module.exports = config;
