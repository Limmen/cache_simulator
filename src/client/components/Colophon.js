/**
 * Functional stateless Component shown for the colophon page.
 *
 * Created by kim on 2016-05-19.
 */

'use strict';

import React from 'react';

let Colophon = () => (
  <div className="colophon-component" >
    <h3 className="bold">Colophon</h3>
    <p>The site is written in JavaScript and styled with Cascading Style Sheets. </p>
    <p>React.js is used for view rendering with redux for state management.</p>
    <p>Twitter Bootstrap is used for styling components on the page.</p>
    <p>Hosted at Heroku. </p>
    <p>The site is written by <a href="https://github.com/Limmen" target="_blank">Kim Hammar</a></p>

  </div>
);

Colophon.displayName = 'Colophon';
export default Colophon;
