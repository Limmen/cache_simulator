/**
 * Index redux-container. Container for the index-route and connects it to the redux store.
 */
'use strict';

import React from 'react';
import { connect } from 'react-redux'
import Forms from './Forms';
import CacheMemory from './CacheMem';

class Index extends React.Component {
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

Index.propTypes = {}

function mapStateToProps() {
  return {}
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)


