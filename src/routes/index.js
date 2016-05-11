/**
 * Created by kim on 2016-05-11.
 */

import React from 'react';
import {Router, Route, IndexRoute} from 'react-router'

import App from './../client/containers/App';
import Index from './../client/containers/Index';
import NotFound from './../client/components/404';

export default (history) => {
  return(
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Index}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  );
}
