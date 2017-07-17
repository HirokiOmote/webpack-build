'use strict';

import webpack from 'webpack';
import path from 'path';
import fromPairs from 'lodash.frompairs';
import glob from 'glob';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {config} from '../package';

let jsPath = [config.js];
jsPath = config.js;

const {input, output} = jsPath;
const files = glob.sync(`${path.resolve(input)}/**/!(_)*.js`);
const entry = fromPairs(files.map(filePath => [
  filePath.replace(path.resolve(input), '').replace(/\.js$/, ''),
  filePath
]));

export default {
  entry,

  output : {
    path: path.resolve(output),
    filename: '[name].js'
  },

  cache : true,

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],

  module : {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader!eslint-loader'
      }
    ]
  }
}
