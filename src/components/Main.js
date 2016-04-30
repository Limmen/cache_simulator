'use strict';

import React from 'react';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

require('normalize.css/normalize.css');
require('styles/App.css');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index container-fluid">
        <div className="row">
          <HeaderComponent/>
        </div>
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <h2 className="text-center">CONTENT</h2>
          </div>
          <div className="col-sm-3"></div>
        </div>
        <div className="row">
          <FooterComponent />
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
