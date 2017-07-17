'use strict';

import sassCompile from './config/webpack.sass.config.js';
import ejsCompile from './config/webpack.ejs.config.js';
import jsCompile from './config/webpack.js.config.js';

// export default sassCompile;
export default [
  ejsCompile,
  sassCompile,
  jsCompile
];
