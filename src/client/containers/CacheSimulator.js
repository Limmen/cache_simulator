/**
 * CacheSimulator redux-container. Container for the index-route and connects it to the redux store.
 */
'use strict';

import React from 'react';
import { connect } from 'react-redux'
import SettingsPanel from './SettingsPanel';
import InstructionPanel from './InstructionPanel';
import CacheMemory from './CacheMem';
import MemoryPanel from './MemoryPanel';

class CacheSimulator extends React.Component {

  renderCache() {
    if (this.props.associativity != undefined && this.props.cacheSize != undefined && this.props.blockSize != undefined) {
      return (
        <div>
          <div className="row cache_panel">
            <h3 className="bold center_text">Cache Memory</h3>
            <div className="row">
              <CacheMemory />
            </div>
            <div className="row">
              <InstructionPanel />
            </div>
          </div>
          <hr></hr>
          <div className="row memory_panel">
            <h3 className="bold center_text">Main Memory</h3>
            <MemoryPanel />
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
 * @returns {{associativity: (*|associativity|string|string), cacheSize: (*|cacheSize|string|string), blockSize: (*|blockSize|string|string)}} object with props
 */
function mapStateToProps(state) {
  return {
    associativity: state.cachecontent.associativity,
    cacheSize: state.cachecontent.cacheSize,
    blockSize: state.cachecontent.blockSize
  }
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CacheSimulator)


