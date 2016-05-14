/**
 * CacheMemory redux-container. Connects the cachememory layout with the redux store.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/'
import Table from '../components/Table'

class CacheMem extends React.Component {

  createTables() {
    let tables = [];
    for (let i = 0; i < this.props.associativity; i++) {
      tables.push(<Table key={i} rows={this.props.blockCount} blocksize={this.props.blockSize}/>);
    }
    return tables;
  }

  getCacheSize() {
    return this.props.blockCount * this.props.blockSize * this.props.associativity;
  }

  render() {
    return (
      <div className="row">
        <div className="cache_info">
          <p className="col-sm-3">Cache size: {this.getCacheSize()} Bytes</p>
          <p className="col-sm-3">Associativity: {this.props.associativity}</p>
          <p className= "col-sm-3">Block Count: {this.props.blockCount}</p>
          <p className= "col-sm-3">Block Size: {this.props.blockSize} Bytes</p>
        </div>
        {this.createTables()}
      </div>
    );
  }
}

CacheMem.propTypes = {}

/**
 * Maps application state that is used in this container to props.
 *
 * @param state application state
 * @returns {{associativity: (*|associativity|string|string), blockCount: (*|blockCount|string|string), blockSize: (*|blockSize|string|string)}} object with props
 */
function mapStateToProps(state) {
  return {
    associativity: state.cacheform.associativity,
    blockCount: state.cacheform.blockCount,
    blockSize: state.cacheform.blockSize
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CacheMem)
