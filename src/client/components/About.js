/**
 * Functional stateless Component shown for the about page.
 *
 * Created by kim on 2016-05-19.
 */

'use strict';

import React from 'react';

let About = () => (
  <div className="about-component left_align_text">
    <h3 className="bold center_text_2">What is this?</h3>
    <p>This is a cache simulator that can be used for educational purposes. The simulator lets you manually simulate a D-cache memory's behaviour in a uniprocessor system
      by issuing LOAD/STORE intructions on a simulated cache and main memory.</p>
    <p>The simulator works under the assumption that address length and word size are 32 bit and that the simulated processor uses a load-store architecture.
      Additionally, the cache uses a write-through policy for memory writes.
    </p>
    <p>Before simulation you enter properties for the cache and you have the freedom to decide yourself if you want to simulate a direct-mapped cache (1-way set associative), 2-way set associative, ... fully associative (m-way associative)</p>
    <h4 className="bold center_text_2">How to use it?</h4>
    <p> TODO </p>
    <h4 className="bold center_text_2">Can i use this for teaching?</h4>
    <p>Yes. It is distributed under the MIT license and you can use it however you like
     as long as you don't violate the license or copyright.</p>
    <h4 className="bold center_text_2">Contributing</h4>
    <p>Bug reports and ideas for development extensions are welcome on the
      <a href="https://github.com/Limmen/cache_simulator" target="_blank"> GitHub Repo</a></p>
  </div>
);

About.displayName = 'About';
export default About;
