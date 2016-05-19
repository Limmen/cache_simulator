/**
 * NavBarComponent. A component displaying a navbar for navigating the site.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import { Link } from 'react-router'

class NavBar extends React.Component {

  render() {
    return (
      <div className="navbar-component center-block align_center">
        <ul className="nav nav-pills">
          <li>
            <Link to="/index" activeClassName="active">Simulator</Link>
          </li>
          <li>
            <Link to="/about" activeClassName="active" >What is this?</Link>
          </li>
          <li>
            <Link to="/colophon" activeClassName="active">Colophon</Link>
          </li>
        </ul>
      </div>
    );
  }
}

NavBar.displayName = 'NavBar';
export default NavBar;
