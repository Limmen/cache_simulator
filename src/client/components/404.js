/**
 * Functional stateless Component shown for 404s - when page is not found.
 *
 * Created by kim on 2016-05-11.
 */

'use strict';

import React from 'react';

let NotFound = () => (
  <div className="404-component">
    <h3 className="bolder">404 - PAGE NOT FOUND</h3>
  </div>
);

NotFound.displayName = 'NotFound';
export default NotFound;
