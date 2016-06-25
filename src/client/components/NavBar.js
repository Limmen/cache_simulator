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
      <ul className="nav navbar-nav center center-text navbar-component inline">
        <li>
          <NavLink to="/simulator" onClick={this.props.linkClicked}>Simulator</NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={this.props.linkClicked}>What is this?</NavLink>
        </li>
        <li>
          <NavLink to="/tutorial" onClick={this.props.linkClicked}>Tutorial</NavLink>
        </li>
        <li>
          <NavLink to="/colophon" onClick={this.props.linkClicked}>Colophon</NavLink>
        </li>
      </ul>
    );
  }
}

NavBar.displayName = 'NavBar';
export default NavBar;
