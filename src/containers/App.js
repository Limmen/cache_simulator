'use strict';

import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import HeaderComponent from './../components/HeaderComponent';
import FooterComponent from './../components/FooterComponent';
//import CounterComponent from './../components/CounterComponent';

require('normalize.css/normalize.css');
require('styles/App.css');

class App extends React.Component {
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
            <Link to="/counter">CounterExample</Link>
            {this.props.children}
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

//App.defaultProps = {};
App.propTypes = {
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
)(App)

