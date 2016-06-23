/**
 * Functional stateless Component shown for the colophon page.
 *
 * Created by kim on 2016-05-19.
 */

'use strict';

import React from 'react';

let Colophon = () => (
  <div className="colophon-component left_align_text" >
    <h3 className="bold center_text_2">Colophon</h3>
    <p>The site is written in fullstack JavaScript with node.js on the serverside. Webpages are styled with Cascading Style Sheets.
    React.js is used for view rendering with redux for state management.
    Twitter Bootstrap is used for styling some of the components on the page.
    Hosted at Heroku. </p>
    <p>The site is written by <a href="https://github.com/Limmen" target="_blank">Kim Hammar</a></p>

  </div>
);

Colophon.displayName = 'Colophon';
export default Colophon;
