'use strict';

import React from 'react';

require('styles//Counter.css');

let CounterComponent = (props) => (
  <div className="counter-component">
    <div className="row">
      <div className="col-sm-3"></div>
      <div className="col-sm-3">
        <button type="button" className="btn btn-default" onClick={props.onIncrement}>Increment</button>
      </div>
      <div className="col-sm-3">
        <p>{props.value}</p>
        </div>
      <div className="col-sm-3"></div>
    </div>
  </div>
);

CounterComponent.displayName = 'CounterComponent';

CounterComponent.propTypes = {
  value: React.PropTypes.number.isRequired,
  onIncrement: React.PropTypes.func.isRequired,
};
//CounterComponent.defaultProps = {};

export default CounterComponent;
