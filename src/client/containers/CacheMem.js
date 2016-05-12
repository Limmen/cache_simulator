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

  createTables(){
    let tables = [];
    for (let i = 0; i < this.props.associativity; i++) {
      tables.push(<Table key={i} rows={this.props.cache_size} blocksize={this.props.block_size}/>);
    }
    return tables;
  }

  render() {
    return (
      <div className="row">
        {this.createTables()}
      </div>
    );
  }
}

CacheMem.propTypes = {}

function mapStateToProps(state) {
  return {
    associativity: state.cacheform.associativity,
    cache_size: state.cacheform.cacheSize,
    block_size: state.cacheform.blockSize
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CacheMem)
