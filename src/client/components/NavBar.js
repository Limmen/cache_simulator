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
    <div className="collapse navbar-collapse navbar-component">
      <ul className="nav navbar-nav center center-text">
        <li>
          <NavLink to="/simulator" onClick={this.props.linkClicked}>Simulator</NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={this.props.linkClicked}>What is this?</NavLink>
        </li>
        <li>
          <NavLink to="/colophon" onClick={this.props.linkClicked}>Colophon</NavLink>
        </li>
      </ul>
    </div>
    );
  }
}

NavBar.displayName = 'NavBar';
export default NavBar;
