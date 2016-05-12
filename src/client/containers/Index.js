'use strict';

import React from 'react';
import { connect } from 'react-redux'
import Forms from './Forms';
import CacheMemory from './CacheMem';

class App extends React.Component {
  render() {
    return (
      <div className="index container-fluid">
        <div className="row">
          <Forms />
        </div>
        <div className="row">
          <CacheMemory />
        </div>
      </div>
    );
  }
}

App.propTypes = {}

function mapStateToProps() {
  return {}
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


