'use strict';

import React from 'react';

require('styles//Header.css');

let HeaderComponent = (props) => (
  <div className="header-component">
    <div className="jumbotron">
      <h1 className="display-2 text-center">Cache-Simulator</h1>
    </div>
  </div>
);

HeaderComponent.displayName = 'HeaderComponent';

// Uncomment properties you need
// HeaderComponent.propTypes = {};
// HeaderComponent.defaultProps = {};

export default HeaderComponent;
