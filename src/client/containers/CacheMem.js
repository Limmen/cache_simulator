/**
 * CacheMemory redux-container. Connects the cachememory layout with the redux store.
 *
 * Created by kim on 2016-05-12.
 */

'use strict';

import React from 'react';
import { connect } from 'react-redux'
import Table from '../components/CacheTable'

class CacheMem extends React.Component {

  createTables() {
    let tables = [];
    for (let i = 0; i < this.props.cachecontent.sets.length; i++) {
      tables.push(<Table className="set_margin center center-block" key={i} data={this.props.cachecontent.sets[i]}/>);
    }
    return tables;
  }

  bitSize(num) {
    return num.toString(2).length;
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="cache_info center-block col-sm-4">
            <table className="table table-striped">
              <caption>Cache properties</caption>
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
                <td>{this.props.cachecontent.cacheSize} Bytes</td>
              </tr>
              <tr>
                <td>Associativity</td>
                <td>{this.props.cachecontent.associativity}</td>
              </tr>
              <tr>
                <td>Block Count</td>
                <td>{this.props.cachecontent.blockCount}</td>
              </tr>
              <tr>
                <td>Block Size</td>
                <td>{this.props.cachecontent.blockSize} Bytes</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-4">
            <table className="table table-bordered">
              <caption>Address Layout</caption>
              <tbody>
              <tr>
                <td>
                  Tag({32 - (this.bitSize(this.props.cachecontent.blockCount - 1) + this.bitSize(this.props.cachecontent.blockSize - 1))} bits)
                </td>
                <td>
                  Index({this.bitSize(this.props.cachecontent.blockCount - 1)} bits)
                </td>
                <td>
                  Offset({this.bitSize(this.props.cachecontent.blockSize - 1)} bits)
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-4">
            <table className="table table-striped">
              <caption>Cache performance and locality</caption>
              <tbody>
              <tr>
                <td>Hit rate</td>
                <td> </td>
              </tr>
              <tr>
                <td>Miss rate</td>
                <td> </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          {this.createTables()}
        </div>
        <div className="row">

        </div>
      </div>
    );
  }
}

CacheMem.propTypes = {}

/**
 * Maps application state that is used in this container to props.
 *
 * @param state
 * @returns {{cachecontent: *}} object with props
 */
function mapStateToProps(state) {
  return {
    cachecontent: state.cachecontent
  }
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CacheMem)
