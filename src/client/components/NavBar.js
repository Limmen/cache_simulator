/**
 * NavBarComponent. A component displaying a navbar for navigating the site.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import NavLink from './NavLink'

class NavBar extends React.Component {

  render() {
    return (
      <div className="navbar-component">
        <ul className="nav nav-pills">
          <li>
            <NavLink to="/simulator">Simulator</NavLink>
          </li>
          <li>
            <NavLink to="/about">What is this?</NavLink>
          </li>
          <li>
            <NavLink to="/colophon">Colophon</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

NavBar.displayName = 'NavBar';
export default NavBar;
