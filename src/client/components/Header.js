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
  </div>
);

Header.displayName = 'Header';
export default Header;

