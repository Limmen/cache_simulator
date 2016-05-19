/**
 * CacheSimulator redux-container. Container for the index-route and connects it to the redux store.
 */
'use strict';

import React from 'react';
import { connect } from 'react-redux'
import SettingsPanel from './SettingsPanel';
import InstructionPanel from './InstructionPanel';
import CacheMemory from './CacheMem';

class CacheSimulator extends React.Component {

  renderCache() {
    if (this.props.associativity != undefined && this.props.blockCount != undefined && this.props.blockSize != undefined) {
      return (
        <div className="cache_panel">
          <div className="row">
            <CacheMemory />
          </div>
          <div className="row">
            <InstructionPanel />
          </div>
        </div>
      )
    }
    else {
      return (
        <h3 className="bold">Enter properties for the cache to simulate it</h3>
      )
    }
  }

  render() {
    return (
      <div className="index container-fluid">
        <div className="row">
          <SettingsPanel />
          {this.renderCache()}
        </div>
      </div>
    );
  }
}

CacheSimulator.propTypes = {}

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

const mapDispatchToProps = () => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CacheSimulator)


