/**
 * Header component.
 */
'use strict';

import React from 'react';
import NavBar from './NavBar'

class Header extends React.Component {

  render() {
    return(
      <div className="header-component">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
            </div>
            <NavBar linkClicked={this.props.linkClicked}/>
          </div>
        </nav>
      </div>
    );
  }
}

Header.displayName = 'Header';
export default Header;

