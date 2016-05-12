/**
 * File that bootstraps our server with babel to enable us to write in es6.
 *
 * Created by kim on 2016-05-10.
 */
require('babel-core/register')({
  presets: ['es2015', 'react']
});
require('./../server')  // fire up express and everything else
