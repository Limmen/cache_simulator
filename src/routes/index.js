/**
 * Module to instantiate routes for react-router. Utilized both for client-side and server-side rendering.
 *
 * Created by kim on 2016-05-11.
 */

import React from 'react';
import {Router, Route, IndexRoute} from 'react-router'

import App from './../client/containers/App';
import Index from './../client/containers/Index';
import NotFound from './../client/components/404';
import About from './../client/components/About';
import Colophon from './../client/components/Colophon';

/**
 * Creates the react-router given a history
 *
 * @param history
 * @returns {XML}
 */
export default (history) => {
  return(
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Index}/>
        <Route path="index" component={Index}/>
        <Route path="about" component={About}/>
        <Route path="colophon" component={Colophon}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  );
}
