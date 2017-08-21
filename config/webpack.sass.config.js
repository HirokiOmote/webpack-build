'use strict';

import path from 'path';
import fromPairs from 'lodash.frompairs';
import glob from 'glob';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { config } from '../package.json';

const sassPath = [] = config.sass;
const { input, output } = sassPath;
const files = glob.sync(`${path.resolve(input)}/**/!(_)*.s[ac]ss`);
const entry = fromPairs(
  files.map(filePath => [
    filePath.replace(path.resolve(input), '').replace(/\.s[ac]ss$/, ''),
    filePath,
  ])
);

console.log(entry);

export default {
  entry,

  output: {
    path: path.resolve(output),
    filename: '[name].css',
  },

  cache: true,

  module: {
    loaders: [
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('css-loader?url=false!postcss-loader!sass-loader'),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader?limit=2000',
      }
    ],
  },

  plugins: [
    new StyleLintPlugin({
      configFile: '.stylelintrc'
    }),
    new ExtractTextPlugin('[name].css')
  ],
}
