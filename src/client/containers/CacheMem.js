/**
 * CacheMemory redux-container. Connects the cachememory layout with the redux store.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import { connect } from 'react-redux'
import Table from '../components/Table'

class CacheMem extends React.Component {

  createTables() {
    let tables = [];
    for (let i = 0; i < this.props.associativity; i++) {
      tables.push(<Table key={i} rows={this.getBlockCount()} blocksize={this.props.blockSize}/>);
    }
    return tables;
  }

  getBlockCount() {
    return (this.props.cacheSize / this.props.associativity) / this.props.blockSize;
  }

  bitSize(num) {
    return num.toString(2).length;
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="cache_info center-block col-sm-6">
            <table className="table table-striped">
              <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Address length</td>
                <td>32 bits</td>
              </tr>
              <tr>
                <td>Word size</td>
                <td>32 bits</td>
              </tr>
              <tr>
                <td>Cache size</td>
                <td>{this.props.cacheSize} Bytes</td>
              </tr>
              <tr>
                <td>Associativity</td>
                <td>{this.props.associativity}</td>
              </tr>
              <tr>
                <td>Block Count</td>
                <td>{this.getBlockCount()}</td>
              </tr>
              <tr>
                <td>Block Size</td>
                <td>{this.props.blockSize} Bytes</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-6">
            <p className="bold">Address Layout</p>
            <table className="table table-bordered">
              <tbody>
              <tr>
                <td>
                  Tag({32 - (this.bitSize(this.props.cacheSize -1))} bits)
                </td>
                <td>
                  Index({this.bitSize(this.getBlockCount() - 1)} bits)
                </td>
                <td>
                  Offset({this.bitSize(this.props.blockSize - 1)} bits)
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          {this.createTables()}
        </div>
      </div>
    );
  }
}

CacheMem.propTypes = {}

/**
 * Maps application state that is used in this container to props.
 *
 * @param state application state
 * @returns {{associativity: (*|associativity|string|string), cacheSize: (*|cacheSize|string|string), blockSize: (*|blockSize|string|string)}} object with props
 */
function mapStateToProps(state) {
  return {
    associativity: state.cacheform.associativity,
    cacheSize: state.cacheform.cacheSize,
    blockSize: state.cacheform.blockSize
  }
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CacheMem)
