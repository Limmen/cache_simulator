/**
 * MemoryPanel redux-container. Connects the instruction panel to the redux-store.
 *
 * Created by kim on 2016-05-11.
 */

'use strict';

import React from 'react';
import { connect } from 'react-redux'
import MemoryTableComponent from './../components/MemoryTable';

class MemoryPanel extends React.Component {

  render() {
    return (
      <div>
        <MemoryTableComponent data={this.props.memory}/>
      </div>
    );
  }
}

MemoryPanel.propTypes = {

}

/**
 * If specified, the component will subscribe to Redux store updates. Any time it updates, mapStateToProps will be called.
 * Its result must be a plain object*, and it will be merged into the component’s props.
 * If you omit it, the component will not be subscribed to the Redux store.
 *
 * @returns {{}}
 */
function mapStateToProps(state) {
  return {
    memory: state.memorycontent.memory
  }
}

const mapDispatchToProps = () => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoryPanel)
