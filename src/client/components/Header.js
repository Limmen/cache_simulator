/**
 * Functional stateless Header component.
 */
'use strict';

import React from 'react';
import NavBar from './NavBar'

let Header = () => (
  <div className="header-component">
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <NavBar/>
      </div>
    </nav>
    <div className="jumbotron">
      <h1 className="display-2 text-center"><strong>Cache-Simulator</strong></h1>
    </div>
  </div>
);

Header.displayName = 'Header';
export default Header;
