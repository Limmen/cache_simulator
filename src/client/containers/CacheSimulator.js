/**
 * CacheSimulator redux-container. Container for the index-route and connects it to the redux store.
 */
'use strict';

import React from 'react';
import {connect} from 'react-redux'
import SettingsPanel from './SettingsPanel';
import InstructionPanel from './InstructionPanel';
import AssemblyPanel from './AssemblyPanel';
import CacheMemory from './CacheMem';
import MemoryPanel from './MemoryPanel';
import RegisterPanel from './RegisterPanel';
import InstructionResultPanel from './InstructionResultPanel';
import {Element} from 'react-scroll';

class CacheSimulator extends React.Component {

  renderCache() {
    if (this.props.associativity != undefined && this.props.cacheSize != undefined && this.props.blockSize != undefined) {
      return (
        <div className="row">
          <CacheMemory />
          <hr></hr>
          <h3 className="bold center_text">Simulate Processor Intructions</h3>
          <div>
            <h5 className="bold  center_text">Run single instruction (4-byte word instructions)</h5>
            <InstructionPanel/>
            <h5 className="bold  center_text">Run multiple instructions (4-byte word instructions)</h5>
            <AssemblyPanel/>
          </div>
          <hr></hr>
          <h3 className="bold center_text">Instruction Results</h3>
          <InstructionResultPanel />
          <hr></hr>
          <h3 className="bold center_text">Registers</h3>
          <RegisterPanel />
          <hr></hr>
          <h3 className="bold center_text">Main Memory</h3>
          <MemoryPanel />
        </div>
      )
    }
    else {
      return (
        <h3 className="bold center_text">Enter properties for the cache to simulate it</h3>
      )
    }
  }

  render() {
    return (
      <div className="index container-fluid">
        <div className="row">
          <h3 className="bold center_text">Configurations</h3>
          <SettingsPanel />
          <hr></hr>
        </div>
        <Element name="cache_init_scroll_position">
          {this.renderCache()}
        </Element>
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
    associativity: state.cacheAndMemoryContent.get('cache').get('associativity'),
    cacheSize: state.cacheAndMemoryContent.get('cache').get('cacheSize'),
    blockSize: state.cacheAndMemoryContent.get('cache').get('blockSize')
  }
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CacheSimulator)


