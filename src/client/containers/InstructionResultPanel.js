/**
 * InstructionResultPanel redux-container. Connects the instruction panel to the redux-store.
 *
 * Created by kim on 2016-05-11.
 */

'use strict';

import React from 'react';
import { connect } from 'react-redux'
import InstructionTableComponent from './../components/InstructionTable';

class InstructionResultPanel extends React.Component {

  render() {
    return (
      <div>
        <InstructionTableComponent data={this.props.instructionHistory}/>
      </div>
    );
  }
}

InstructionResultPanel.propTypes = {

}

function mapStateToProps(state) {
  return {
    instructionHistory: state.cacheAndMemoryContent.get('instructionHistory')
  }
}

const mapDispatchToProps = () => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstructionResultPanel)
