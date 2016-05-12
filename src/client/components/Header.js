/**
 * Functional stateless Header component.
 */
'use strict';

import React from 'react';

let Header = () => (
  <div className="header-component">
    <div className="jumbotron">
      <h1 className="display-2 text-center"><strong>Cache-Simulator</strong></h1>
    </div>
  </div>
);

Header.displayName = 'Header';
export default Header;
