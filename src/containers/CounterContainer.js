'use strict';

import React from 'react';
import { connect } from 'react-redux'
import CounterComponent from './../components/CounterComponent';

require('normalize.css/normalize.css');
//require('styles/CounterContainer.css');

class CounterContainer extends React.Component {
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

//CounterContainer.defaultProps = {};
CounterContainer.propTypes = {
  value: React.PropTypes.number.isRequired,
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
)(CounterContainer)

