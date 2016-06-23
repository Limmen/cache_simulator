/**
 * Functional stateless Component shown for the about page.
 *
 * Created by kim on 2016-05-19.
 */

'use strict';

import React from 'react';

let About = () => (
  <div className="about-component">
    <h3 className="bold">What is this?</h3>
    <p>This is a cache simulator that can be used for educational purposes. The simulator lets you manually simulate a D-cache memory's behaviour
      by issuing LOAD/STORE intructions on a simulated cache and main memory.</p>
    <p>The simulator works under the assumption that address length and word size are 32 bit and that the simulated processor uses a load-store architecture.
      Additionally, the cache uses a write-through policy for memory writes.
    </p>
    <h4 className="bold">Can i use this for teaching?</h4>
    <p>Yes. It is distributed under the MIT license and you can use it however you like
     as long as you don't violate the license or copyright.</p>
    <h4 className="bold">Contributing</h4>
    <p>Bug reports and ideas for development extensions are welcome on the
      <a href="https://github.com/Limmen/cache_simulator" target="_blank"> GitHub Repo</a></p>
  </div>
);

About.displayName = 'About';
export default About;
