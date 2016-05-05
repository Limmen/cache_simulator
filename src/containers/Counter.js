'use strict';

import React from 'react';
import { connect } from 'react-redux'
import CounterComponent from './../components/Counter';

require('normalize.css/normalize.css');
//require('styles/Counter.css');

class Counter extends React.Component {
  render() {
    return (
      <div>
        <CounterComponent
          value={this.props.value}
          onIncrement={this.props.onIncrement}
        />
      </div>
    );
  }
}

//Counter.defaultProps = {};
Counter.propTypes = {
  value: React.PropTypes.number.isRequired
}

function mapStateToProps(state) {
  return {
    value : state.counter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => {
      dispatch({ type: 'INCREMENT' })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

