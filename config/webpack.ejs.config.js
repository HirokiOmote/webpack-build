'use strict';

import path from 'path';
import fromPairs from 'lodash.frompairs';
import glob from 'glob';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { config } from '../package';

const ejsPath = [] = config.ejs;
const { input, output } = ejsPath;
const files = glob.sync(`${path.resolve(input)}/**/!(_)*.+(ejs|htm|html)`);
const entry = fromPairs(
  files.map(filePath => [
    filePath.replace(path.resolve(input), '').replace(/\.(?:ejs|html?)$/, ''),
    filePath,
  ])
);

export default {
  entry,

  output: {
    path: path.resolve(output),
    filename: '[name].html',
  },

  cache: true,

  module: {
    loaders: [
      {
        test: /\.(?:ejs|html?)$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('raw-loader', 'ejs-html-loader'),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].html')
  ],
}
