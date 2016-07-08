/**
 * Functional stateless Footer component.
 */
'use strict';

import React from 'react';

let Footer = () => (
  <div className="footer-component">
    <footer className="footer">
      <div className="container footer_container">
        <p className="text-muted">
        <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/" className="license">
          <img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" />
        </a>
          </p>
        This work is licensed under a
        <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"> Creative Commons Attribution-ShareAlike 4.0 International License
        </a>.
        <p className="text-muted">
          Copyright 2016@Kim Hammar
        </p>
      </div>
    </footer>
  </div>
);

Footer.displayName = 'Footer';
export default Footer;
