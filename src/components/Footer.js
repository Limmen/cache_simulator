'use strict';

import React from 'react';

require('styles//Footer.css');

let Footer = () => (
  <div className="footer-component">
    <footer className="footer">
      <div className="container">
        <p className="text-muted">Copyright 2016@Kim Hammar</p>
      </div>
    </footer>
  </div>
);

Footer.displayName = 'Footer';

// Uncomment properties you need
// Footer.propTypes = {};
// Footer.defaultProps = {};

export default Footer;