'use strict';

import React from 'react';

require('styles//Header.css');

let Header = () => (
  <div className="header-component">
    <div className="jumbotron">
      <h1 className="display-2 text-center">Cache-Simulator</h1>
    </div>
  </div>
);

Header.displayName = 'Header';

// Uncomment properties you need
// Header.propTypes = {};
// Header.defaultProps = {};

export default Header;
